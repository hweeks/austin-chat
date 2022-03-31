import { Router, NextFunction, Response, Request } from "express";
import { joke_model } from "../models/joke";
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
  if (!token) next(new Error("no token no jokin"));
  const { new_joke } = req.body;
  const token_decode = JSON.parse(decodeToken(token).payload)
  const found_author = token_decode.user_id;
  console.log(token_decode)
  try {
    await joke_model.create({ author: found_author, joke: new_joke });
    res.send({ complete: true });
  } catch (err) {
    res.send(err);
  }
};

joke_router.post("/api/joke/create", add_a_joke);

// finds a random joke in our jokes _OR_ returns an error if you haven't made one
const get_a_joke = async (
  req: Request,
  res: Response,
) => {
  const joke_count = await joke_model.count()
  const rando_offset = Math.floor(Math.random() * joke_count)
  const found_joke = await joke_model.findOne().skip(rando_offset).exec()
  if (!found_joke) res.send({error: true, message: 'no jokes, no content'})
  //added a else statement.. was throwing an error in the server console if found joke was null.
  else res.send({joke: found_joke.joke})
}

joke_router.get('/api/joke/get', get_a_joke)
