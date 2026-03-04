export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || "dev_access_secret",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "dev_refresh_secret",
  accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
};