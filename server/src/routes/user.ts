import { Router, NextFunction, Response, Request } from "express";
import jws from "jws";
import { User, authenticate, tokenAuthentication } from "../models/user";

const router = Router();

// using tokens to store info!
export const createToken = async (password: string, user_id: string) => {
  return jws.sign({
    header: { alg: "HS256" },
    payload: { password, user_id },
    secret: process.env.JWT_SECRET || "come_up_with_a_secret_string",
  });
}

export const decodeToken = (token: string) => {
  return jws.decode(token);
};

// allow a user to login
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const userFound = await authenticate(username, password);
    const token = await createToken(userFound.password, userFound?.id);
    // this cookie being set is how we will check on later requests
    // are actually authenticated!
    res.cookie("token", token, { signed: true });
    // send back the token incase we wanna do something else with it!
    res.send({ token });
  } catch (error) {
    next(error)
  }
};

router.post("/api/user/login", userLogin);

const userVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies;
  try {
    const userFound = await tokenAuthentication(token)
    res.send(userFound.username)
  } catch (error) {
    res.send({error: "Something went wrong!"})
  }
}

router.get("/api/user/verifyUser", userVerification)

// allow someone to create a user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const builtUser = await User.create({ username, password });
    const token = await createToken(builtUser?.id || "", builtUser.password);
    // this cookie being set is how we will check on later requests
    // are actually authenticated!
    res.cookie("token", token, { signed: true });
    res.send({ token });
  } catch (error) {
    next(error)
  }
};

router.post("/api/user/create", createUser);

export const UserRouter = router;