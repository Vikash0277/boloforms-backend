// controllers/signController.js
const Document = require('../models/document');

const getDocumentForSigner = async (req, res) => {
  const { documentId, email } = req.params;

  try {
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Optional: check if email exists in signers
    const signer = document.signers.find(s => s.email.toLowerCase() === email.toLowerCase());

    if (!signer) {
      return res.status(403).json({ message: "You are not authorized to sign this document" });
    }

    res.status(200).json({
      message: "Document retrieved successfully",
      document,
      signer,
    });
  } catch (error) {
    console.error("Error retrieving document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getDocumentForSigner };
