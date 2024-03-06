module.exports = asyncController => {
  return (req,res,next) => {
    asyncController(req,res,next).catch((err)=> {
      next(err)
    })
  }
} 