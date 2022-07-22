const checkLogin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You aren't logged in"
      })
    }
    next();
  };
  
  module.exports = { checkLogin }