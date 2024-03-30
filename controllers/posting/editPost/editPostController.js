const {
	Post,
	Size,
	Importance,
	Section,
	Category,
	Post_category,
	Contact,
} = require("../../../src/db");

const { Op } = require("sequelize")


const editPost = async (req, res) => {
	const { idPost = 1 } = req.query;
	const { size, importance, img, section,contactType ,categories, contactValue } = req.body;
	const postFound = await Post.findByPk(idPost);
	if (!postFound) {
		return res.status(404).json({
			message: "not found post",
		});
	}
	postFound.img = img ? img : postFound.img;
	postFound.contactValue = contactValue ? contactValue : postFound.contactValue;
	if (importance) {
		const importanceFoundId = await Importance.findOne({
			attributes: ["id"],
			where: {
				importance
			}
		});
		if (importanceFoundId) postFound.importanceId = importanceFoundId.id;
	}
	
	if (size) {
		const sizeFoundId = await Size.findOne({
			attributes: ["id"],
			where: {
				size
			}
		});
		if (sizeFoundId) postFound.sizeId = sizeFoundId.id;
	}
	
	if (section) {
		const sectionFoundId = await Section.findOne({
			attributes: ["id"],
			where: {
				name: section
			}
		});
		if (sectionFoundId) postFound.sectionId = sectionFoundId.id;
	}
	
	
	if (contactType) {
		const contactTypeId = await Contact.findOne({ //! solo tiene un campo, por eso no traigo el id
			where: {
				type: contactType
			}
		});
		if (contactTypeId) postFound.contactType = contactTypeId.type;
	}

	//! Actualizar categorias inicio.
	const newCategoriesIds = (await Category.findAll({
		attributes:["id"],
		where:{
			name:{
				[Op.in]:[...categories]
			}
		}
	})).map(obj =>obj.id)

	const post_categoryFound = await Post_category.findAll({
		where:{
			postId:postFound.id
		}
	})

	//!el for elimin las categorias no necesarias.
	for(let i = 0 ; i < post_categoryFound.length ; i++) {
		if(!newCategoriesIds.includes(post_categoryFound[i]["categoryId"])){
			post_categoryFound[i]["categoryId"] = null
					await post_categoryFound[i].save()
			}
	}
		//! Actualizar categorias fin (faltan cosas).
		const bulkObjToAddCategories = newCategoriesIds.map(cat => ({ postId:postFound.id,categoryId:cat }))
		await Post_category.bulkCreate(bulkObjToAddCategories)
		await postFound.save();
		
		console.log(bulkObjToAddCategories,newCategoriesIds,categories);

	return res.status(200).json({
		message: "The post was update",
		data: postFound,
	});
};

module.exports = editPost;