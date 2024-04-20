import { type ClassValue, clsx } from "clsx"
import jwt, { JwtPayload } from "jsonwebtoken";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "24h",
};

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as string;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateSearchParams = (type: string, value: string) => {
   
   const searchParams = new URLSearchParams(window.location.search);

   searchParams.set(type, value);
   
   const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
   return newPathName;
}