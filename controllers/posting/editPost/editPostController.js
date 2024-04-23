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
	const { id,expire,owner ,size, importance, img, section, contactType, categories, contactValue } = req.body;
	const postFound = await Post.findByPk(id);
	if (!postFound) {
		return res.status(404).json({
			message: "not found post",
		});
	}

	
	
	postFound.img = img ? img : postFound.img;
	postFound.owner = owner ? owner : postFound.owner;
	postFound.expire = expire ? expire : postFound.expire;

	postFound.contactValue = contactValue ? contactValue : postFound.contactValue;
	await postFound.save()
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
	let newCategoriesIds = (await Category.findAll({
		attributes: ["id"],
		where: {
			name: {
				[Op.in]: [...categories]
			}
		}
	})).map(obj => obj.id)

	const post_categoryFound = await Post_category.findAll({
		where: {
			postId: postFound.id
		}
	})
	const idsToRemoveFromNewCategoriesToCreate = []
	for (let i = 0; i < newCategoriesIds.length; i++) {
		//!el if si elimina las categorias viejas no necesarias.
		if (post_categoryFound[i] && !newCategoriesIds.includes(post_categoryFound[i]["categoryId"])) {

			const idToDelete = post_categoryFound[i]["categoryId"]
			await Post_category.destroy({
				where: {
					"categoryId": idToDelete
				}
			})

		}
		if (post_categoryFound[i] && newCategoriesIds.includes(post_categoryFound[i]["categoryId"])) {
			const idToDelete = post_categoryFound[i]["categoryId"]
			idsToRemoveFromNewCategoriesToCreate.push(idToDelete)

		}
	}
	// 	//! Actualizar categorias fin (faltan cosas).
	const bulkObjToAddCategories = newCategoriesIds.filter(catId => (!idsToRemoveFromNewCategoriesToCreate.includes(catId))).map(cat => ({ postId: postFound.id, categoryId: cat }))
	await Post_category.bulkCreate(bulkObjToAddCategories)
	await postFound.save();


	return res.status(200).json({
		message: "The post was update",
		data: postFound,
	});
};

module.exports = editPost;