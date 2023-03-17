import express from "express"
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const router = express.Router();
const PORT = process.env.PORT || 8080;
const app = express();
import routes from "./routes/MiddlewareRoutes.js";
// setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
import session from "express-session";
import mainRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
app.set("view engine", "ejs");
import path from "path";

let MONGODB_URI = 'mongodb+srv://dash:Mavaratchi1.@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority'
const uri = MONGODB_URI
app.set("views", path.join(path.resolve(), "views"));
app.use(express.static(path.join(path.resolve(), "static")));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(mainRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(dashboardRoutes);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://dash:Mavaratchi1.@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority', {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});

const connection = mongoose.connection;


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://dash:Mavaratchi1.@snakemongodb.uvvqkzx.mongodb.net/?retryWrites=true&w=majority' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week

}));



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});