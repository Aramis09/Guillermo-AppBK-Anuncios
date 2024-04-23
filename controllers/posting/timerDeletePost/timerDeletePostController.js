const { conn } = require("../../../src/db");
const {	Post } = require("../../../src/db");
const { QueryTypes } = require("sequelize");

const timerDeletePostsExpired = async (req, res, next) => {
  const dateToday = (new Date().toLocaleDateString()).split("/")
  const dateTodayFormated = `${dateToday[2]}/${dateToday[1]}/${dateToday[0]}` //date formart //year / month/ day
  console.log(dateTodayFormated, typeof dateTodayFormated);
  const postsExpired  = await conn.query(`select * from posts where expire <= '${dateTodayFormated}' and deleted = false;`, {
      type: QueryTypes.SELECT,
      model: Post, // Modelo para mapear los resultados
      mapToModel: true
    })

  if(!postsExpired.length) return next()

  for(let i = 0; i < postsExpired.length ;i++){
    postsExpired[i].deleted = true
    await postsExpired[i].save()
  }

	return next()
};

module.exports = timerDeletePostsExpired 

