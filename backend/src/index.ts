import mongoose from 'mongoose';
import app from './app';
import 'dotenv/config';

let server: any;
const options: Object = {
    useNewUrlParser: true,
}

mongoose.connect(process.env.MONGODB_URL as string, options).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
})
.catch((e) => {
    console.log("Mongoose connection error");
    console.log(e);
});