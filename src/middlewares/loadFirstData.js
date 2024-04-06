const { User, Size, Importance, Section, Contact } = require("../db");
const catchingErrors = require("../utils/errors/catchingErrors");
const bcrypt = require("bcrypt");

const { USER_VALUE, PASSWORD_VALUE } = process.env;

module.exports = catchingErrors(async (req, res, next) => {
	const arrSizes = await Size.findAll();
	const arrImportances = await Importance.findAll();
	const userAdminFound = await User.findByPk(1);
	const sectionsFound = await Section.findAll();
	const contactsFound = await Contact.findAll();

	if (!arrSizes.length) {
		await Size.bulkCreate([
			{ size: 1 },
			{ size: 2 },
			{ size: 3 },
			{ size: 4 },
			{ size: 5 },
		]);
	}

	if (!arrImportances.length) {
		await Importance.bulkCreate([
			{ importance: "A" },
			{ importance: "B" },
			{ importance: "C" },
			{ importance: "D" },
			{ importance: "E" },
		]);
	}

	if (!sectionsFound.length) {
		await Section.bulkCreate([
			{ name: "Events" },
			{ name: "Main" },
			{ name: "Useful Information" },
		]);
	}

	if (!contactsFound.length) {
		await Contact.bulkCreate([
			{ type: "whatsapp" },
			{ type: "personal-page" },
			{ type: "direct-phone" },
			{ type: "none" },
		]);
	}

	if (!userAdminFound) {
		const salt = await bcrypt.genSalt(10);
		const passwordEncrypt = await bcrypt.hash(
			!PASSWORD_VALUE ? null : PASSWORD_VALUE,
			salt
		);

		await User.create({
			user: !USER_VALUE ? null : USER_VALUE,
			password: passwordEncrypt,
		});
		// res.status(200).json({
		//   bcrypt,
		//   PASSWORD_VALUE,
		//   USER_VALUE,
		//   passwordEncrypt,
		//   newAdmin
		// })
	}
	next();
});
