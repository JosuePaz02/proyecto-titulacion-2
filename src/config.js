const { config } = require("dotenv");
config();

const PORT = process.env.PORT || 3000;
const CAPTCHA_KEY = process.env.CAPTCHA_KEY;
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET;
const TOKEN_SECRET = "secret 123";

module.exports = { PORT, CAPTCHA_KEY, CAPTCHA_SECRET, TOKEN_SECRET };
