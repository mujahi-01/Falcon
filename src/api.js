import fetch from "node-fetch";
import { CONFIG } from "./config.js";

export async function sendToServer(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);

  try {
    const res = await fetch(CONFIG.SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client": CONFIG.CLIENT_NAME,
        "X-Version": CONFIG.VERSION
      },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}
