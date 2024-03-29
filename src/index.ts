import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT ? process.env.PORT : 3000;
let server;

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});
// connect(mongoose.url, _mongoose.options).then(() => {
//   info('Connected to MongoDB');
//   server = listen(port, () => {
//     info(`Listening to port ${port}`);
//   });
// });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      // info('Server closed');
      console.log("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  // _error(error);
  console.log("error ", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  // info('SIGTERM received');
  console.log("sigterm");
  if (server) {
    server.close();
  }
});
