const mongoose = require("mongoose");
Schema = mongoose.Schema;

const MockData2Model = new Schema(
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
		team_name: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, collection: "mock_data_2" },
);

module.exports = new mongoose.model("mock2", MockData2Model);
