const { Op } = require("sequelize");
// const { Sequelize, query, literal } = require("sequelize");

const {
	// User,
	Post,
	Size,
	Importance,
	Section,
	Category,
	Post_category,
	// Contact,
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
		// order = "ASC",
		categories,
	} = req.query;
	// const offset = (page - 1) * quantityResult;
	// const where = await buildingArrWhere({ size, importance, section });
	const CTGlBJ = JSON.parse(categories);
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

module.exports = {
	createPost: catchingErrors(require("./createPost/createPostController")),
	deletePost: catchingErrors(require("./deletePost/deletePostController")),
	editPost: catchingErrors(require("./editPost/editPostController")),
	getPosts: catchingErrors(getPosts),
	getPostsByCategories: catchingErrors(getPostsByCategories),
	timerDeletePostExpired:catchingErrors(require("./timerDeletePost/timerDeletePostController"))
};
