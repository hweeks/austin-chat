import express from "express";
import graceful from "graceful";
import node_graceful from "node-graceful";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import { connect_to_db, stop_db } from "./db";
import { UserRouter } from "./routes/user";
import { joke_router } from "./routes/jokes";

// this cerates the express application itself
const your_entire_application = express();

const setup_the_environment_for_the_app = async () => {
  await connect_to_db();
  // stop bad cyber attacks (it's just a bunch of best practices)
  your_entire_application.use((req, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("X-Frame-Options", "ALLOW-FROM *");
    next();
  })
  your_entire_application.use(body_parser.json({limit: '2mb'}));

  // make it possible to manipulate cookies
  your_entire_application.use(
    cookie_parser(process.env.JWT_SECRET || "come_up_with_a_secret_string")
  );

  // setup the ability to register a user
  your_entire_application.use(UserRouter);
  your_entire_application.use(joke_router);
  your_entire_application.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
  })

  // create an actual http server
  const server = your_entire_application.listen(3005, () => console.log("up"));

  // setup the shutdown steps!
  graceful({
    servers: [server],
    killTimeout: "30s",
  });
  node_graceful.captureExceptions = true;
  node_graceful.on("exit", async () => {
    await stop_db();
  });
};

setup_the_environment_for_the_app();
