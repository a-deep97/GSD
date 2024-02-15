
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(403).send({ success: false, message: "Invalid Authorization header format." });
    }
    const authToken = tokenParts[1];
    if(!authToken){
      res.status(403).send({success:false,message: 'Inaccessible page'})
    }
    jwt.verify(authToken, JWT_SECRET, (err, decoded)=> {
      if (err) {
        res.status(403).send({ success: false, message: "Failed to authenticate user." })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.status(403).send({ success: false, message: "No Token Provided." })
  }
};

module.exports = authenticateToken;
