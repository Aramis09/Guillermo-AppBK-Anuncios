const { Op } = require("sequelize");
const { Sequelize, query, literal } = require("sequelize");

const {
	User,
	Post,
	Size,
	Importance,
	Section,
	Category,
	Post_category,
	Contact,
} = require("../../src/db");
const catchingErrors = require("../../src/utils/errors/catchingErrors");
const buildingArrWhere = require("./helpers/buildingArrayWhere");

const getPosts = async (req, res) => {
	const {
		size,
		importance,
		section,
		page = 1,
		quantityResult = 10,
		order = "ASC",
	} = req.query;
	const offset = (page - 1) * quantityResult;
	const where = await buildingArrWhere({ size, importance, section });

	const { count, rows: arrPost } = await Post.findAndCountAll({
		where,
		include: [{ model: Size }, { model: Importance }, { model: Section }],
		offset,
		limit: quantityResult,
		order: [
			[Importance, "importance", order],
			[Size, "size", "DESC"],
		],
	});
	return res.status(200).json({
		message: "Succesfuly",
		pages: Math.ceil(count / quantityResult),
		nextPage: Number(page) + 1,
		prevPage: Number(page) - 1,
		currentPage: Number(page),
		data: arrPost,
	});
};

const getPostsByCategories = async (req, res) => {
	const {
		size,
		importance,
		section,
		page = 1,
		quantityResult = 10,
		order = "ASC",
		categories,
	} = req.query;
	const offset = (page - 1) * quantityResult;
	const where = await buildingArrWhere({ size, importance, section });
	const CTGlBJ = JSON.parse(categories);
	console.log(CTGlBJ[0], typeof CTGlBJ, "<<<<-----");
	const arrIdsCategories = (
		await Category.findAll({
			where: {
				name: {
					[Op.in]: [...JSON.parse(categories)],
				},
			},
		})
	).map((c) => c.id);

	const { count, rows: postsFound } = await Post.findAndCountAll({
		include: [
			{
				model: Category,
				through: {
					model: Post_category,
					attributes: [], // No necesitamos recuperar ningún atributo de la tabla intermedia
				},
				where: {
					id: {
						[Op.in]: [...arrIdsCategories],
					},
				},
			},
			{ model: Size },
			{ model: Importance },
			{ model: Section },
		],
	});

	return res.status(200).json({
		message: "Succesfuly",
		pages: Math.ceil(count / quantityResult),
		nextPage: Number(page) + 1,
		prevPage: Number(page) - 1,
		currentPage: Number(page),
		data: postsFound,
		CTGlBJ,
	});
};

const createPost = async (req, res) => {
	const { idUser = 1 } = req.query;
	const { contactType, categories, size, importance, section } = req.body;

	//!add post to user
	const uniqueUserExisting = await User.findByPk(idUser);
	const newPost = await uniqueUserExisting.createPost(req.body);
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
	const bulkObjToCreate = categoriesFoundIds.map((categoryId) => ({
		postId: newPost.id,
		categoryId,
	}));
	const ver = await Post_category.bulkCreate(bulkObjToCreate);
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
		bulkObjToCreate,
	});
};







const deletePost = async (req, res) => {
	const { idPost = 1 } = req.query;

	await Post.destroy({
		where: {
			id: idPost,
		},
	});

	return res.status(200).json({
		message: "The post was delete",
	});
};

module.exports = {
	createPost: catchingErrors(createPost),
	deletePost: catchingErrors(deletePost),
	editPost: catchingErrors(require("./editPost/editPostController")),
	getPosts: catchingErrors(getPosts),
	getPostsByCategories: catchingErrors(getPostsByCategories),
};
