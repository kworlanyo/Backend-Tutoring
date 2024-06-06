import jwt from "jsonwebtoken";

export function refreshTokens(req, res, next) {
  const accessToken = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, { expiresIn: "15s" });
  const refreshToken = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY, { expiresIn: "1d" });

  res.json({
    accessToken,
    refreshToken,
  });
}
