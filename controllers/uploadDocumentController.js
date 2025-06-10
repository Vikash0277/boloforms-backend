const fs = require("fs").promises;
const cloudinary = require("../config/cloudinary");
const Document = require("../models/document");

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Upload to Cloudinary under 'signerApp' folder
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "signerApp",
      resource_type: "auto",
    });

    // Delete file from local filesystem
    await fs.unlink(filePath);

    const signers = JSON.parse(req.body.signers || "[]");
    console.log("📋 Signers received:", signers);
    
    const doc = await Document.create({
      fileName: req.file.originalname,
      url: result.secure_url,
      signers,
    });


    await doc.save();

    console.log("document to save", doc);
    

    res.status(201).json({
      message: "File uploaded successfully",
      document: doc,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};





module.exports = {
  uploadDocument,
 
};
