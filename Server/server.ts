import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./router";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import passportConfig from "./passportConfig";
import routes from "./Api/Routes/createRouter";

const server = express();
const { NODE_ENV } = process.env;

// ---- MIDDLEWARE --------

server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const SESSION_SECRET = "awe1q2434rt4tw3";

server.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true
  })
);

if (NODE_ENV === "production") {
  server.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      proxy: true,
      saveUninitialized: false,
      cookie: { sameSite: "none", httpOnly: false, secure: true }
    })
  );
} else {
  server.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
}

server.use(passport.initialize());
server.use(passport.session());
passportConfig(passport);

server.use("/", routes);
server.use("/", router);

export default server;
