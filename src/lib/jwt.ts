import { SignJWT, jwtVerify } from "jose";
import { JwtPayload } from "jsonwebtoken";
const SECRET = new TextEncoder().encode(process.env.SECRET_KEY);

interface Payload {
  username: string;
  id: number;
}

export const signJWT = async (payload: Payload) => {
  try {
    const alg = "HS256";

    return new SignJWT({ payload })
      .setProtectedHeader({ alg })
      .setExpirationTime("2h")
      .setIssuedAt()
      .setSubject(payload.username)
      .sign(SECRET);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    const verify = (await jwtVerify(token, SECRET)).payload as JwtPayload;

    const { payload } = verify;
    return payload as T;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};
