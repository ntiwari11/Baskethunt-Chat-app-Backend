exports.userWelcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to user routes",
  });
};
