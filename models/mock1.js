const mongoose = require("mongoose");
Schema = mongoose.Schema;

const MockData1Model = new Schema(
	{
		full_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		number: {
			type: Number,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, collection: "mock_data_1" },
);

module.exports = new mongoose.model("mock1", MockData1Model);
