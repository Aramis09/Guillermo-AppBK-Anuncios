const {
	User,
	Size,
	Importance,
	Section,
	Category,
	Post_category,
	Contact,
} = require("../../../src/db");
const { Op } = require("sequelize");


const createPost = async (req, res) => {
	const { idUser = 1 } = req.query;
	const { contactType, categories, size, importance, section, expire = "2024-4-1",deleted = false } = req.body;
	console.log(req.body.expire);
	//!add post to user
	const uniqueUserExisting = await User.findByPk(idUser);
	const newPost = await uniqueUserExisting.createPost({...req.body,expire:new Date(expire),deleted});
	//!add post to size
	const sizeFound = await Size.findByPk(size);
	await sizeFound.addPost(newPost);
	//!add post to Importance
	const importanceFound = await Importance.findOne({
		where: {
			importance: importance,
		},
	});
	await importanceFound.addPost(newPost);
	//!add post to list of categories
	const categoriesFoundIds = await (
		await Category.findAll({
			where: {
				name: {
					[Op.in]: categories,
				},
			},
		})
	).map((objCat) => objCat.id);
	const bulkObjToCreateCategories = categoriesFoundIds.map((categoryId) => ({
		postId: newPost.id,
		categoryId,
	}));
	const ver = await Post_category.bulkCreate(bulkObjToCreateCategories);
	//!add post to section.
	if (
		section === "Events" ||
    section === "Main" ||
    section === "Useful Information"
	) {
		const sectionFound = await Section.findOne({
			where: {
				name: section,
			},
		});
		await sectionFound.addPost(newPost);
	}
	//!add post to contact type
	const contactFound = await Contact.findByPk(contactType);
	if (contactFound) {
		await contactFound.addPost(newPost);
	}

	return res.status(200).json({
		message: "The posst was created",
		ver,
		bulkObjToCreateCategories,
	});
};

module.exports = createPost