require('dotenv').config();
export default {
  secret: process.env.JWT_SECRET || "mysecret",
  expiresIn: process.env.EXPIRE_TOKEN || "1d",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "myanothersecret",
  refreshExpiresIn: "7d"
};
