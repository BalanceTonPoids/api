const mongoose = require("mongoose");
const validator = require("validator");

const scaleSchema = new mongoose.Schema({
	weight: Number,
	IMC: Number,
	fat: Number,
	muscle: Number,
	water: Number,
	date: Date,
});

/**
 * @typedef Scale
 */
const Scale = mongoose.model("Scale", scaleSchema);

module.exports = Scale;
