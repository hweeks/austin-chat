import { Router, NextFunction, Response, Request } from "express";
import jws from "jws";
import { User, authenticate } from "../models/user";

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
    if(userFound.failed) throw new Error(userFound.message)
    const token = await createToken(userFound.password, userFound?.id);
    // this cookie being set is how we will check on later requests
    // are actually authenticated!
    res.cookie("token", token, { signed: true });
    // send back the token incase we wanna do something else with it!
    res.send({ token, username });
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
  if(token){
    const token_decode = JSON.parse(decodeToken(token).payload)
    const user_id = token_decode.user_id;
    const foundUser = await User.find({ user_id })
    try {
      res.send({username: foundUser[0].username})
    } catch (error) {
      res.send({error: "Something went wrong!"})
    }
  }
}

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  res.send({success:true});
};

router.get("/api/user/logout", userLogout);

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
    res.send({ token, username });
  } catch (error) {
    error.message = "Username is already in use."
    next(error)
  }
};

router.post("/api/user/create", createUser);

const handle_error = async (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error)
  res.send({message: error.message})
}

router.use("/api/user/", handle_error)

export const UserRouter = router;