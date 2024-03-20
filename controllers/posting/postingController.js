const { Op } = require('sequelize');
const { Sequelize, query } = require('sequelize');

const { User, Post, Size, Importance, Section, Category, Post_category } = require('../../src/db');
const catchingErrors = require("../../src/utils/errors/catchingErrors")
const buildingArrWhere = require("./helpers/buildingArrayWhere")

const getPosts = async (req, res) => {
  const { size, importance, section, page = 1,quantityResult = 10,order = "ASC" } = req.query
  const offset = (page - 1) * quantityResult;
  const where = await buildingArrWhere({size, importance, section})

  const { count, rows:arrPost } = await Post.findAndCountAll({
    where,
    include:[
      {model:Size},
      {model:Importance},
      {model:Section}
    ],
    offset,
    limit:quantityResult,
    order: [
      [Importance, 'importance', order],
      [Size, 'size', "DESC"],
    ],
  })
  return res.status(200).json({
    message:"Succesfuly",
    pages:Math.ceil(count/quantityResult),
    nextPage: Number(page) + 1,
    prevPage:Number(page) - 1,
    currentPage:Number(page),
    data:arrPost,
  })
}

const getPostsByDetail = async (req, res) => {
  const { categories, size, importance, section, page = 1,quantityResult = 10,order = "ASC" } = req.query
  const offset = (page - 1) * quantityResult;
  const where = await buildingArrWhere({size, importance, section})
  // const categoriesFoundIds = await (await Category.findAll({
  //   where: {
  //     name: {
  //       [Op.in]: categories
  //     }
  //   }
  // })).map( objCat => objCat.id)
  
  const anunciosIds = query()
 
  res.status(200).json({
    s:"ok",
    anunciosIds
  })
}


const createPost = async (req, res) => {
  const { idUser = 1 } = req.query
  const { categories, size, importance, section } = req.body

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
  //!add post to list of categories
  const categoriesFoundIds = await (await Category.findAll({
    where: {
      name: {
        [Op.in]: categories
      }
    }
  })).map( objCat => objCat.id)
  bulkObjToCreate = categoriesFoundIds.map(categoryId => ({postId:newPost.id, categoryId}))
  const ver = await Post_category.bulkCreate(bulkObjToCreate)

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
    ver,
    bulkObjToCreate

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
    data:postFound,
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
  getPosts: catchingErrors(getPosts),
  getPostsByDetail: catchingErrors(getPostsByDetail)

}