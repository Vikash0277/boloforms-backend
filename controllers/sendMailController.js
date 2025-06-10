
const Document =require("../models/document")
const sendSigningEmail = require('../utils/sendMail');

const sendMail = async (req, res) => {
  const { documentId } = req.body;
  console.log("documentId", documentId);

  try {
    // Fetch the document by ID
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Loop over signers and send emails
    for (const signer of document.signers) {
      await sendSigningEmail({ to: signer.email, documentId });
    }

    res.status(200).json({ message: 'Emails sent to all signers.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send signing emails.' });
  }
}

module.exports={sendMail};