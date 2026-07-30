/**
 * Local Telegram Bot API mock — proves lead → sendMessage wiring end-to-end
 * when TELEGRAM_CHAT_ID is not yet known. Not a substitute for a real chat.
 */
import http from "http";

const port = Number(process.env.MOCK_TG_PORT || 4099);
const hits = [];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8");
  let body = {};
  try {
    body = raw ? JSON.parse(raw) : {};
  } catch {
    body = { raw };
  }
  hits.push({ path: url.pathname, body, at: new Date().toISOString() });
  console.log("TG_MOCK", url.pathname, JSON.stringify(body).slice(0, 200));

  res.setHeader("Content-Type", "application/json");
  if (url.pathname.endsWith("/sendMessage")) {
    res.end(JSON.stringify({ ok: true, result: { message_id: 1 } }));
    return;
  }
  if (url.pathname.endsWith("/getMe")) {
    res.end(
      JSON.stringify({
        ok: true,
        result: { id: 1, is_bot: true, username: "mock" },
      }),
    );
    return;
  }
  res.end(JSON.stringify({ ok: true }));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Telegram mock on http://127.0.0.1:${port}`);
});
