/**
 * Long-poll Telegram getUpdates until a chat_id appears, then write it to .env.local.
 * Usage: node scripts/capture-telegram-chat-id.mjs
 * Prerequisite: open https://t.me/bukafituzbot and send /start
 */
import fs from "fs";
import path from "path";

const envPath = path.resolve(".env.local");
const env = fs.readFileSync(envPath, "utf8");
const token = env.match(/^TELEGRAM_BOT_TOKEN=(.+)$/m)?.[1]?.trim();
if (!token) {
  console.error("TELEGRAM_BOT_TOKEN missing in .env.local");
  process.exit(1);
}

const existing = env.match(/^TELEGRAM_CHAT_ID=(.*)$/m)?.[1]?.trim();
if (existing) {
  console.log("TELEGRAM_CHAT_ID already set:", existing);
  process.exit(0);
}

console.log("Waiting for /start on @bukafituzbot (up to 90s)…");
const deadline = Date.now() + 90_000;
let offset = 0;

while (Date.now() < deadline) {
  const url = `https://api.telegram.org/bot${token}/getUpdates?timeout=25&offset=${offset}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.ok) {
    console.error(data);
    process.exit(1);
  }
  for (const upd of data.result ?? []) {
    offset = upd.update_id + 1;
    const chat = upd.message?.chat ?? upd.my_chat_member?.chat;
    if (chat?.id != null) {
      const id = String(chat.id);
      const next = env.replace(
        /^TELEGRAM_CHAT_ID=.*$/m,
        `TELEGRAM_CHAT_ID=${id}`,
      );
      fs.writeFileSync(envPath, next.endsWith("\n") ? next : `${next}\n`);
      console.log("Captured TELEGRAM_CHAT_ID=", id, `(${chat.type} ${chat.username ?? chat.first_name ?? ""})`);
      process.exit(0);
    }
  }
}

console.error("Timed out — open https://t.me/bukafituzbot and send /start, then re-run.");
process.exit(2);
