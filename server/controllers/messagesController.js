import {Router} from "express";
import messageModel from "../model/messageModel.js";

export const MessageController = Router();

//Add Message
MessageController.post("/addMsg", async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await messageModel.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        });
        if(data) {
            return res.json({
                msg: "Message added successfully"
            })
        } else {
            return res.send(400).json({
                msg: "Failed to add message"
            })
        }
    } catch (err) {
        next(err);
    }
})

//Get All Messages
MessageController.post("/getMsg", async (req, res, next) => {
   try {
       const { from, to } = req.body;
       const messages = await messageModel.find({
           users: {
               $all: [from, to],
           }
       })
           .sort({updatedAt: 1});

       console.log(`messages: ${messages}`)

       const projectedMessages = messages.map((msg) => {
           return {

                   fromSelf: msg.sender.toString() === from,
                   message: msg.message.text,
           }
       });
       console.log(projectedMessages)

       res.json(projectedMessages);
   } catch (err) {
       next(err);
   }
})
