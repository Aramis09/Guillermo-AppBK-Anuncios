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

	console.log(req.query);
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
		where,
		offset,
		limit:quantityResult,
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
		data: postsFound,
	});
};


const getPostDetail = async (req, res) => {
	const { id } = req.query
	const postFound = await Post.findByPk(id,{
		include:[{model:Category},{model:Section},{model:Importance},{model:Size}]
	})
	if(!postFound) return res.status(404).send({
		data:null,
		msg:"No found post"
	})

	res.status(200).send({
		data:postFound
	})
};

const getPostByOwner = async (req, res) => {
	const { owner } = req.query
	const postsFound = await Post.findAll({
		include:[{model:Category},{model:Section},{model:Importance},{model:Size}],
		where:{
			owner:{
				[Op.iLike]:`%${owner}%`
			}
		}
	})

	if(!postsFound) return res.status(404).send({
		data:null,
		msg:"Not found"
	})

	return res.status(200).send({
		data:postsFound
	})

};



module.exports = {
	createPost: catchingErrors(require("./createPost/createPostController")),
	deletePost: catchingErrors(require("./deletePost/deletePostController")),
	editPost: catchingErrors(require("./editPost/editPostController")),
	getPosts: catchingErrors(getPosts),
	getPostsByCategories: catchingErrors(getPostsByCategories),
	timerDeletePostExpired:catchingErrors(require("./timerDeletePost/timerDeletePostController")),
	getPostDetail: catchingErrors(getPostDetail),
	getPostByOwner: catchingErrors(getPostByOwner)
};
