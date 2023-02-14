const mongoose = require("mongoose");

const scaleSchema = new mongoose.Schema({
	weight: {
		type: Number,
		required: true,
	},
	IMC:{
		type: Number,
		required: true,
	},
	fat: {
		type: Number,
		required: true,
	},
	muscle:{
		type: Number,
		required: true,
	},
	water: {
		type: Number,
		required: true,
	},
	date: Date,
});

/**
 * @typedef Scale
 */
const Scale = mongoose.model("Scale", scaleSchema);

module.exports = Scale;
