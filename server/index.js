import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",  // ✅ WORKING MODEL
        messages: [
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    console.log("OPENROUTER RESPONSE:", data);

    const reply =
      data.choices?.[0]?.message?.content || "No response 😅";

    res.json({ reply });

  } catch (error) {
    console.error("ERROR:", error);
    res.json({ reply: "Error aa gaya bhai 😅" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});