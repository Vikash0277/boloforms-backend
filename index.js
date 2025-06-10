const express = require("express");
const Dbconnection = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const uploadDocumentRouter = require("./routes/uploadDocumentRoute");
const signDocumentRouter = require("./routes/signDocument")
const sendMailRouter = require("./routes/sendMail")



dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(cors({
  origin: "https://boloforms-frontend.vercel.app/", 
  credentials: true
}));



const PORT = process.env.PORT || 3000;
app.use(express.json()); 

app.use(express.urlencoded({extended:true}));


Dbconnection();

// Import routes
app.use("/api/v1",authRouter);
app.use("/api/v1",uploadDocumentRouter)
app.use("/api/v1",signDocumentRouter)
app.use("/api/v1",sendMailRouter);



app.get("/", (req, res) => {
  res.send("Boloforms Backend is running!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
