import jwt from "jsonwebtoken";

exports.generateToken = (id, tokenValidity = "30d") => {
  // console.log(tokenValidity);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: tokenValidity,
  });
};
