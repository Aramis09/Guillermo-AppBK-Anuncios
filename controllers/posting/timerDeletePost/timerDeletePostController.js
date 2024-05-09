const { conn } = require("../../../src/db");
const {	Post } = require("../../../src/db");
const { QueryTypes } = require("sequelize");

const timerDeletePostsExpired = async (req, res, next) => {
  const originalDate = new Date();
  const formattedDate = originalDate.toISOString().replace("T", " ").replace("Z", " +00:00");
  console.log(formattedDate,"<<<<<<<<<<<<<<<<<");
  const postsExpired  = await conn.query(`select * from posts where expire <= '${formattedDate}' and deleted = false;`, {
      type: QueryTypes.SELECT,
      model: Post, // Modelo para mapear los resultados
      mapToModel: true
    })
    console.log(postsExpired.map(c => c.expire));
  if(!postsExpired.length) return next()
  for(let i = 0; i < postsExpired.length ;i++){
    postsExpired[i].deleted = true
    await postsExpired[i].save()
  }

	return next()
};

module.exports = timerDeletePostsExpired 

