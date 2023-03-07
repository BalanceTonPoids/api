const Scale = require("../models/scale");
const User = require("../models/user");

class ScaleController {
	async create(req, res) {
		const scale = new Scale(req.body);
		try {
			await scale.save();
			const _id = req.user._id;
			const user = await User.findById(_id);
			if (!user) {
				return res.status(404).send({"error": "User not found"});
			}
			user.scale_data.push(scale);
			await user.save();
			res.status(201).send(scale);
		} catch (error) {
			res.status(400).send({"error": error});
		}
	}

	async getById(req, res) {
		const _id = req.params.id;
		try {
			const scale = await Scale.findById(_id);
			if (!scale) {
				return res.status(404).send({"error": "Scale not found"});
			}
			res.send(scale);
		} catch (error) {
			res.status(500).send({"error": error});
		}
	}

	async delete(req, res) {
		const _id = req.params.id;
		try {
			const scale = await Scale.findByIdAndDelete(_id);
			if (!scale) {
				return res.status(404).send({"error": "Scale not found"});
			}
			res.send(scale);
		} catch (error) {
			res.status(500).send({"error": error});
		}
	}
}

module.exports = new ScaleController();
