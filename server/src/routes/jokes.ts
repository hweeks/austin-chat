import { Router, NextFunction, Response, Request } from "express";
import { joke_model } from "../models/joke";
import { User } from "../models/user";
import { decodeToken } from "./user";

export const joke_router = Router();

// this allows us to add a joke _if_ we are logged in, have signed our cookies,
// and have a token set in the cookies for our user.
export const add_a_joke = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies;
  const { joke } = req.body;
  const token_decode = JSON.parse(decodeToken(token).payload)
  const user_id = token_decode.user_id;
  const found_user = await User.findOne({ user_id })
  try {
    await joke_model.create({ user_id: found_user["_id"], joke });
    res.send({ complete: true });
  } catch (err) {
    next(err);
  }
};

joke_router.post("/api/joke/create", add_a_joke);

// finds a random joke in our jokes _OR_ returns an error if you haven't made one
const get_a_joke = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joke_count = await joke_model.count()
    const rando_offset = Math.floor(Math.random() * joke_count)
    const found_joke = await joke_model.findOne().skip(rando_offset).exec()
    if (!found_joke) {
      const error = new Error('no jokes, no content')
      error.name = "no jokes"
      throw error
    }
    else {
      const user_id = found_joke.user_id;
      const found_user = await User.findOne({ user_id })
      res.send({joke: found_joke.joke, author: found_user.username})
    } 
  } catch (error) {
    next(error)
  }
}

joke_router.get('/api/joke/get', get_a_joke)

const handle_error = async (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(error.code === 11000) res.status(400).send({success: false, message: "Duplicate Joke"})
  if(error.name === "no jokes") res.status(404).send({success: false, message: error.message})
}

joke_router.use("/api/joke/",handle_error)