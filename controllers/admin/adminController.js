exports.adminWelcome = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to admin routes",
  });
};
