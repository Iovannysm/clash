import jwt from 'jsonwebtoken';

module.exports = async (req, res, next) => {
  try {
    
    const bearer = req.headers.authorization;
    if(!bearer) {
      return res.sendStatus(403);
    }

    const token = bearer.split(" ")[1];
    
    const payload = await jwt.verify(token, process.env.SECRET_KEY);

    req.userId = payload._id;

    next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};
