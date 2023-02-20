const apiAdapter = require("../../apiAdapter");
const jwt = require('jsonwebtoken')

const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPRIRED,
  JWT_REFRESH_TOKEN_EXPRIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/users/login", req.body);
    const data = user.data.data;
    console.log(data)
    const token = jwt.sign({  data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPRIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPRIRED,
    });
    await api.post("/refresh_tokens", { refresh_token: refreshToken, user_id: data.id});
    return res.json({
      status: "success",
      data: {
        token,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unvailable" });
    }
    const { status, data } = error.response;
    
    return res.status(status).json(data);
  }
};
