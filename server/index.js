import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  {routes} from "./routes/userRoutes.js";
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

app.listen(parseInt(process.env.PORT), ()=> {
    console.log("Server started")
})
