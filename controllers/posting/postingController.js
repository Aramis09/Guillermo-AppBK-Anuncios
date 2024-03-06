const { User, Post, Size, Importance, Section } = require('../../src/db');
const catchingErrors = require("../../src/utils/errors/catchingErrors")
const buildingArrWhere = require("./helpers/buildingArrayWhere")
//!FALTA PAGINADO
const getPosts = async (req, res) => {
  const { size, importance, section, page = 1,quantityResult = 10 } = req.query
  const offset = (pageNumber - 1) * quantityResult;
  const where = await buildingArrWhere({size, importance, section})

  const arrPost = await Post.findAll({
    where,
    include:[
      {model:Size},
      {model:Importance},
      {model:Section}
    ],
    offset,
    limit:quantityResult,
  })
  return res.status(200).json({
    message:"Succesfuly",
    data:arrPost
  })
}


const createPost = async (req, res) => {
  const { idUser = 1 } = req.query
  const { size, importance, section } = req.body

  //!add post to user
  const uniqueUserExisting = await User.findByPk(idUser)
  const newPost = await uniqueUserExisting.createPost(req.body)
  //!add post to size
  const sizeFound = await Size.findByPk(size)
  await sizeFound.addPost(newPost)
  //!add post to Importance
  const importanceFound = await Importance.findOne({
    where:{
      importance:importance
    }
  })
  await importanceFound.addPost(newPost)

  if(section === "Events" || section === "Main" || section === "Useful Information"){
    const sectionFound = await Section.findOne({
      where:{
        name:section
      }
    })
    await sectionFound.addPost(newPost)
  }

  return res.status(200).json({
    message:"The posst was created",
  })
}

const editPost = async (req, res)=>{
  const { idPost = 1 } = req.query
  const { title,description,img,number_phone,personal_page,location } = req.body


  const postFound = await Post.findByPk(idPost)
  if(!postFound) {
    return res.status(404).json({
      message:"not found post"
    })
  }
  postFound.title = title ? title: postFound.title;
  postFound.description = description ? description: postFound.description;
  postFound.img = img ? img: postFound.img;
  postFound.number_phone = number_phone ? number_phone: postFound.number_phone;
  postFound.personal_page = personal_page ? personal_page: postFound.personal_page;
  postFound.location = location ? location: postFound.location;

  await postFound.save()

  return res.status(200).json({
    message:"The post was update",
    data:postFound
  })
}

const deletePost = async (req, res)=>{
  const { idPost = 1} = req.query

  await Post.destroy({
    where:{
      id:idPost
    }
  })
  
  return res.status(200).json({
    message:"The post was delete"
  })
}

module.exports = {
  createPost: catchingErrors(createPost),
  deletePost: catchingErrors(deletePost),
  editPost: catchingErrors(editPost),
  getPosts: catchingErrors(getPosts)
}