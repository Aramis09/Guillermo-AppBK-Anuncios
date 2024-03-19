const verificationToken = (req,res) => res.status(200).send({
  error:"Tiene acceso",
  acces:true,
})

module.exports = verificationToken