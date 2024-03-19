const keySecretVerify = (req, res, next) => {
  const secretKey = req.header('auth-secret-key')
  if(secretKey !== process.env.KEY_SECRET ) return res.status(401).send({
    error:"you not have autorize"
  })
  next()
}


module.exports = {
  keySecretVerify
}