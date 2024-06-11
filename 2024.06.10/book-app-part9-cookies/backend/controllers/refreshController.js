import jwt from "jsonwebtoken";

export function refreshTokens(req, res, next) {
  // Create JWTs
  const accessToken = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };

  const accessOptions = {
    ...cookieOptions,
    maxAge: 1000 * 10,
  };

  const refreshOptions = {
    ...cookieOptions,
    maxAge: 1000 * 60 * 60 * 24,
    path: "/refresh",
  };

  res.cookie("accessCookie", accessToken, accessOptions);
  res.cookie("refreshCookie", refreshToken, refreshOptions);

  res.end();
}
