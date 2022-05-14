import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  {routes} from "./routes/routes.js";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

routes(app);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err.message)
});
const httpServer = createServer(app);

app.set('port', 5000);

httpServer.listen(app.get('port'), function () {
    const port = httpServer.address();
    console.log('Running on : ', port);
});
//  const server = app.listen(parseInt(process.env.PORT), ()=> {
//     console.log("Server started")
// })

const io =  new Server(httpServer, {
    cors: {
        origin: "https://localhost:3000",
        credentials: true,
    },
});
global.onlineUsers = new Map();

io.on("connection", (Server) => {
    global.chatSocket = Server;
    Server.on("add-user", (userId) => {
        onlineUsers.set(userId, Server.id);
    });
    Server.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            Server.to(sendUserSocket).emit("msg-receive", data.msg)
        }
    })
})


