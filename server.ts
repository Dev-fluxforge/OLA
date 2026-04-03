import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // In-memory state for Live Q&A
  const sessions = {
    "classical-texts": {
      id: "classical-texts",
      title: "Classical Texts Symposium",
      instructor: "Dr. Abdullah Ibn Yusuf",
      status: "live",
      questions: [
        { id: "1", text: "How do we reconcile conflicting narrations in early texts?", author: "Student A", status: "answered", answer: "We look at the chains of narration and the context of each statement." },
        { id: "2", text: "What is the best edition of the Muwatta to study?", author: "Student B", status: "pending" }
      ]
    }
  };

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_session", (sessionId) => {
      socket.join(sessionId);
      console.log(`User ${socket.id} joined session: ${sessionId}`);
      // Send current state of the session
      if (sessions[sessionId]) {
        socket.emit("session_state", sessions[sessionId]);
      }
    });

    socket.on("submit_question", ({ sessionId, text, author }) => {
      if (sessions[sessionId]) {
        const newQuestion = {
          id: Math.random().toString(36).substr(2, 9),
          text,
          author,
          status: "pending"
        };
        sessions[sessionId].questions.push(newQuestion);
        io.to(sessionId).emit("new_question", newQuestion);
      }
    });

    socket.on("answer_question", ({ sessionId, questionId, answer }) => {
      if (sessions[sessionId]) {
        const question = sessions[sessionId].questions.find(q => q.id === questionId);
        if (question) {
          question.status = "answered";
          question.answer = answer;
          io.to(sessionId).emit("question_answered", { questionId, answer });
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/live-sessions", (req, res) => {
    res.json(Object.values(sessions));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
