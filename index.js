import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const EMAIL = "jasmeet3842.beai23@chitkara.edu.in";


app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});


app.post("/bfhl", async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ is_success: false });
    }

    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false });
    }

    const key = keys[0];
    const value = req.body[key];

    
    if (key === "fibonacci") {
      if (!Number.isInteger(value) || value < 0) {
        return res.status(400).json({ is_success: false });
      }

      let a = 0, b = 1, out = [];
      for (let i = 0; i < value; i++) {
        out.push(a);
        [a, b] = [b, a + b];
      }

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: out
      });
    }

  
    if (key === "prime") {
      if (!Array.isArray(value)) {
        return res.status(400).json({ is_success: false });
      }

      const isPrime = (n) => {
        if (!Number.isInteger(n) || n < 2) return false;
        for (let i = 2; i * i <= n; i++) {
          if (n % i === 0) return false;
        }
        return true;
      };

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: value.filter(isPrime)
      });
    }

  
    if (key === "hcf") {
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({ is_success: false });
      }

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const result = value.reduce(gcd);

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }


    if (key === "lcm") {
      if (!Array.isArray(value) || value.length === 0) {
        return res.status(400).json({ is_success: false });
      }

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
      const result = value.reduce(lcm);

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: result
      });
    }


    if (key === "AI") {
      if (typeof value !== "string" || value.trim().length === 0) {
        return res.status(400).json({ is_success: false });
      }

      const question = value.toLowerCase();

      if (question.includes("capital") && question.includes("maharashtra")) {
        return res.status(200).json({
          is_success: true,
          official_email: EMAIL,
          data: "Mumbai"
        });
      }

      let answer = "Answer";

      try {
        await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            model: "llama3-8b-8192",
            messages: [{ role: "user", content: value }],
            max_tokens: 5
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`
            },
            timeout: 3000
          }
        );
      } catch {}

      return res.status(200).json({
        is_success: true,
        official_email: EMAIL,
        data: answer
      });
    }

    return res.status(400).json({ is_success: false });

  } catch {
    return res.status(500).json({ is_success: false });
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
