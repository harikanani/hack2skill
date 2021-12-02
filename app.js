require("dotenv").config();
const MockData1Model = require("./models/mock1");
const MockData2Model = require("./models/mock2");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// DB connection
console.log(process.env.MONGO_URL);
try {
	mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((d) => {
			console.log(`CONNECTED TO: ${process.env.MONGO_URL}`);
		})
		.catch((error) => {
			console.log(`DB CONNECTION ERROR: ${error}`);
		});
} catch (error) {
	console.log(error.message);
}

// Template Engine
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
	let result = await MockData1Model.aggregate([
		{
			$lookup: {
				from: "mock_data_2",
				localField: "email",
				foreignField: "email",

				as: "teamDetails",
			},
		},
		{
			$unwind: "$teamDetails",
		},
		{
			$project: {
				"teamDetails.email": 0,
				"teamDetails.full_name": 0,
				"teamDetails._id": 0,
			},
		},
	]);
	return res.render("index.ejs", { data: result });
});

app.listen(process.env.PORT, (req, res) => {
	console.log(`server up and running on port ${process.env.PORT}`);
});
