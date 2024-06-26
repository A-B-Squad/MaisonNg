import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Context } from "@/pages/api/graphql";

export const signIn = async (
  _: any,
  { input }: { input: SignInInput },
  { prisma, jwtSecret, res }: Context
) => {
  const { email, password } = input;



  // Check if the user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return new Error("Invalid email or password");
  }

  // Check if the password is correct
  const validPassword = await bcrypt.compare(password, existingUser.password);


  if (!validPassword) {
    return new Error("Invalid password Or Email");
  }



  // Generate JWT token
  const token = jwt.sign({ userId: existingUser.id }, jwtSecret, {
    expiresIn: "1h",
  });

  // Set the cookie
  res.setHeader("Set-Cookie", `Token=${token}; Path=/; SameSite=Strict; Secure`);


  return {
    user: existingUser,
    token,
  };
};

export const refreshToken = async (
  _: any,
  { Token }: { Token: string },
  { jwtSecret, res }: Context
) => {
  try {
    // Verify the refresh token
    const decodedToken = jwt.verify(Token, jwtSecret) as JwtPayload;

    // If the Token is valid, generate a new access Token
    const accessToken = jwt.sign({ userId: decodedToken.userId }, jwtSecret, {
      expiresIn: "1h",
    });

    // Set the new access Token in the cookie
    res.setHeader("Set-Cookie", `Token=${accessToken}; Path=/; SameSite=Strict; Secure`);


    // Return the new access Token
    return accessToken;
  } catch (error) {
    // Handle invalid or expired refresh tokens
    return new Error("Invalid or expired refresh Token");
  }

};
