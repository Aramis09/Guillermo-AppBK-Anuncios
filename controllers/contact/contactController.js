const { Contact } = require("../../src/db");
const catchingErrors = require("../../src/utils/errors/catchingErrors");

const createContact = async (req, res) => {
  const { contactType } = req.body;
  const arrContactsFormated = categories.map((category) => ({
    type: contactType,
  }));
  let result = await Contact.bulkCreate(contactType);
  res.status(200).json({
    message: "it was created",
    data: result,
  });
};

const getContact = async (req, res) => {
  const list = await Contact.findAll();
  res.status(200).json({
    message: "it was created",
    data: list,
  });
};

module.exports = {
  createContact: catchingErrors(createContact),
  getContact: catchingErrors(getContact),
};
