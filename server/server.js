const express = require("express");
const config = require("config");
const PORT = config.get("PORT") || 8181;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET"],
  },
});

app.use(cors());

app.use(express.json());
connectToDb();
app.use("/blocks", router);

io.on("connection", (socket) => {
  console.log(`User is connect ${socket.id}`);

  socket.on("send_code", (block) => {
    socket.broadcast.emit("receive_code", block);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
