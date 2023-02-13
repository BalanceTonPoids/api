const Scale = require("../models/scale");
const User = require("../models/user");

class ScaleController {
	async create(req, res) {
		const scale = new Scale(req.body);
		try {
			await scale.save();
			const user = await User.findById(req.params.iduser);
			if (!user) {
				return res.status(404).send("User not found");
			}
			user.scale_data.push(scale);
			await user.save();
			res.status(201).send(scale);
		} catch (error) {
			res.status(400).send(error);
		}
	}

	async getById(req, res) {
		const _id = req.params.id;
		try {
			const scale = await Scale.findById(_id);
			if (!scale) {
				return res.status(404).send();
			}
			res.send(scale);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	async delete(req, res) {
		const _id = req.params.id;
		try {
			const scale = await Scale.findByIdAndDelete(_id);
			if (!scale) {
				return res.status(404).send();
			}
			res.send(scale);
		} catch (error) {
			res.status(500).send(error);
		}
	}
}

module.exports = new ScaleController();
