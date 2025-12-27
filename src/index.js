import { sendToServer } from "./api.js";

export async function runFalcon(userPrompt) {
  console.log("🦅 FALCON is thinking...\n");

  try {
    const response = await sendToServer(userPrompt);

    if (response.error) {
      console.error("❌ Error:", response.error);
      process.exit(1);
    }

    // For now, just print server message
    if (response.message) {
      console.log(response.message);
    } else {
      console.log("⚠️ No response from server.");
    }

  } catch (err) {
    console.error("❌ Failed to contact FALCON server.");
    console.error(err.message);
    process.exit(1);
  }
}
