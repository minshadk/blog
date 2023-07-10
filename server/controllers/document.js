const Document = require("../models/document");

exports.getDocument = async (req, res) => {
  const documentId = req.params.documentId;
  console.log(documentId);
  if (!documentId)
    return res
      .status(400)
      .json({ status: "failed", message: "document id is required" });

  try {
    console.log("try is working");
    const document = await Document.findById(documentId);
    console.log(document);
    return res.status(200).json({
      status: "success",
      data: document,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", error: err });
  }
};

// exports.getAllDocument = async (req, res) => {
//   const userId = req.params.userId;
//   if (!userId)
//     return res
//       .status(400)
//       .json({ status: "failed", message: "document id is required" });

//   try {
//     const documents = await Document.find({ userId: userId });
//     console.log(documents);
//     return res.status(200).json({
//       status: "success",
//       data: documents,
//     });
//   } catch {
//     return res.status(400).json({ status: "failed", error: err });
//   }
// };

exports.getAllDocument = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userIdStr = userId.toString();
    console.log(userId);
    console.log(userIdStr);

    if (!userId) {
      return res.status(400).json({
        status: "failed",
        message: "User ID is required",
      });
    }

    const documents = await Document.find({ userId: userId });
    if (documents.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No documents found for the given user ID",
      });
    }

    console.log(documents);
    return res.status(200).json({
      status: "success",
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while retrieving documents",
      error: error.message,
    });
  }
};
