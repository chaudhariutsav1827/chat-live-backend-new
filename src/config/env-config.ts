import { config as conf } from "dotenv";

conf();

const config = {
  port: process.env.PORT || 3000,
  connectionString: process.env.CONNECTION_STRING,
  production: process.env.PRODUCTION,
  jwtSecretKey: process.env.JWT_SECRET_KEY || "",
  tokenHeaderKey: process.env.TOKEN_HEADER_KEY,
  jwtExpiry: process.env.JWT_EXPIRY || "1h",
};

Object.freeze(config);

export const getConfig = (key: keyof typeof config) => {
  return config[key];
};
