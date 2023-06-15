const httpStatus = require("../constants/httpStatus");
const jwt = require("jsonwebtoken");
const privateKey = "123456qwerty";
const publicKey = "qwerty123456";

const createToken = (id, email) => {
  const payload = {
    userId: id,
    email: email,
  };
  const createOptions = getOptions("createOptions");
  try {
    const token = jwt.sign(payload, privateKey, createOptions);
    return { status: true, token: token };
  } catch (error) {
    return { status: httpStatus.failure, message: "Error while creating the token due to " + error.message };
  }
};

const verifyToken = (authtoken) => {
  const token = authtoken;
  const verifyOtpions = getOptions('verifyOptions');
  try {
    const payload = jwt.verify(token, privateKey, verifyOtpions);
    return { status: true, payload: payload }
  } catch (error) {
    console.log('error while verifying JWT Token', error.message)
    return { status: httpStatus.failure, message: error.message }
  }
};

function getOptions(optionsType) {
  const algorithm = optionsType == 'createOptions' ? 'RS256' : ['RS256']
  return {
    expiresIn: '3h',
  };
}

module.exports = { createToken, verifyToken };
