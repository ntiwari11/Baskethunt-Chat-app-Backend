exports.userWelcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to user routes",
  });
};

// user should be logged in using only password
exports.userLogin = (req, res) => {
  const { password } = req.body;

  res.status(201).json({
    succes: true,
    message: "Ask about this route with sir ",
  });
};
