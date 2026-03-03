import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Initialize Database
const db = new Database("leads.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());
  // API Routes
  app.post("/api/leads", (req, res) => {
    try {
      const { email, phone } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const stmt = db.prepare("INSERT INTO leads (email, phone) VALUES (?, ?)");
      stmt.run(email, phone || null);
      res.json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
      console.error("Error saving lead:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });
  app.get("/api/leads", (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM leads ORDER BY created_at DESC");
      const leads = stmt.all();
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
