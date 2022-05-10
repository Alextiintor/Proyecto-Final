const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("clientMoveRemoteRobot", (direction) => {
        console.log(direction);
        io.emit("serverMovesRobot", (direction))
    })
});

httpServer.listen(8000);