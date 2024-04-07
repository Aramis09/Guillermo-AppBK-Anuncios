const {	Post } = require("../../../src/db");

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

module.exports = deletePost 