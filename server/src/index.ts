import express from "express";
import helmet from "helmet";
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
  your_entire_application.use(helmet());
  your_entire_application.use(body_parser.json());

  // make it possible to manipulate cookies
  your_entire_application.use(
    cookie_parser(process.env.JWT_SECRET || "come_up_with_a_secret_string")
  );

  // setup the ability to register a user
  your_entire_application.use(UserRouter);
  your_entire_application.use(joke_router);

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
