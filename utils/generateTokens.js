import jwt from "jsonwebtoken";

export function generateTokens(user) {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    "ACCESS_TOKEN_SECRET",
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    "REFRESH_TOKEN_SECRET",
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}
