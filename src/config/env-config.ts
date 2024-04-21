import { config as conf } from "dotenv";

conf();

const config = {
  port: process.env.PORT || 3000,
  connectionString: process.env.CONNECTION_STRING,
  production: process.env.PRODUCTION,
};

Object.freeze(config);

export const getConfig = (key: keyof typeof config) => {
  return config[key];
};
