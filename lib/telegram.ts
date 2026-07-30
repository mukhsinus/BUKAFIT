import type { LeadBody } from "@/lib/validations/lead";
import { formatUtmForMessage } from "@/lib/utm";

export type TelegramSendResult =
  | { ok: true }
  | { ok: false; error: string };

function getTelegramConfig():
  | { token: string; chatId: string }
  | { token: null; chatId: null; reason: string } {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim() ?? "";
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim() ?? "";

  if (!token || !chatId) {
    return {
      token: null,
      chatId: null,
      reason:
        "TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set in the environment",
    };
  }

  return { token, chatId };
}

export function formatLeadTelegramMessage(lead: LeadBody): string {
  const plan = lead.planId ?? "—";
  const utm = formatUtmForMessage(lead.utm ?? {});
  const when = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
    dateStyle: "short",
    timeStyle: "medium",
  });

  return [
    "🆕 Новая заявка — Buka FIT",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    `Тариф: ${plan}`,
    `Страница: ${lead.sourcePath ?? "/"}`,
    `Язык: ${lead.locale ?? "ru"}`,
    `UTM: ${utm}`,
    `Время (Ташкент): ${when}`,
  ].join("\n");
}

/**
 * Sends a lead to the manager chat via Telegram Bot API.
 * Chat id and token come ONLY from env — never hardcode.
 */
export async function sendLeadToTelegram(
  lead: LeadBody,
): Promise<TelegramSendResult> {
  const config = getTelegramConfig();

  if (!config.token || !config.chatId) {
    return {
      ok: false,
      error: "reason" in config ? config.reason : "telegram_config_missing",
    };
  }

  const { token, chatId } = config;
  const text = formatLeadTelegramMessage(lead);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });

    const data = (await response.json()) as {
      ok?: boolean;
      description?: string;
    };

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.description ?? `Telegram HTTP ${response.status}`,
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
