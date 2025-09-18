export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "sonoma-dusk", 
        messages: [{ role: "user", content: message }]
      })
    });

    const result = await response.json();
    const reply = result.choices?.[0]?.message?.content || "⚠️ No reply received.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
}