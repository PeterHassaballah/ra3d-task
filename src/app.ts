import express, { json, urlencoded,Response,NextFunction } from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import { indexRoute } from "./routes/v1/index";
import {authLimiter} from './middlewares/rateLimiter';
import jwtStrategy from './config/passport';
import { initializeSocket } from "./socketService";
import { AuthenticatedRequest } from "./types/user.interface";
console.log("hello world we are here:",process.env.PORT)
const app = express();
// Socket.io server
const server = http.createServer(app);
const io = new Server(server);

initializeSocket(io);
app.use((req:AuthenticatedRequest, res:Response, next:NextFunction) => {
  req.io = io; // Attach io to the request object
  next();
});
// parse json request body
app.use(json());
//jwt strategy
app.use(jwtStrategy.initialize());
// gzip compression
app.use(compression());
// body parser
app.use(bodyParser.urlencoded({extended:true}));
// enable cors
app.use(cors());
// rate limiter
app.use(authLimiter);
// parse urlencoded request body
app.use(urlencoded({ extended: true }));
// v1 api routes
app.use("/v1", indexRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(res.status(404).send({ msg: "Not found" }));
});
// convert error to ApiError, if needed
// app.use(errorConverter);

//  handle error
// app.use(errorHandler);

export default app;