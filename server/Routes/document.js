const express = require("express");
const router = express.Router();

const documentController = require("../controllers/document");

router.route("/getDocument/:documentId").get(documentController.getDocument);
router.route("/getAllDocuments/:userId").get(documentController.getAllDocument);

module.exports = router;
