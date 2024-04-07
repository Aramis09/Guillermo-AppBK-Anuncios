const { Router } = require("express");
const {
  getContact,
  createContact,
} = require("../../../controllers/contact/contactController");
const router = Router();

router.get("/", getContact);
router.post("/", createContact);

module.exports = router;
