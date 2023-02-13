const User = require("../models/user");

class UsersController {
	async countUsers(req, res) {
		try {
			const users = await User.count();
			res.send({ count: users });
		} catch (error) {
			res.status(500).send(error);
		}
	}
	async create(req, res) {
		// Check if the user email is already taken
		const email = req.body.email;
		if (await User.isEmailTaken(email)) {
			throw new ApiError(400, "Email already taken");
		}
		const user = new User(req.body);
		try {
			await user.save();
			res.status(201).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	}

	async get(req, res) {
		try {
			const users = await User.find();
			res.send(users);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	async getById(req, res) {
		const _id = req.params.id;
		try {
			const user = await User.findById(_id).populate("scale_data");
			if (!user) {
				return res.status(404).send();
			}
			res.send(user);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	async update(req, res) {
		const _id = req.params.id;
		try {
			const user = await User.findByIdAndDelete(_id);
			if (!user) {
				return res.status(404).send();
			}
			res.send(user);
		} catch (error) {
			res.status(500).send(error);
		}
	}

	async delete(req, res) {
		const _id = req.params.id;
		try {
			const user = await User.findByIdAndDelete(_id);
			if (!user) {
				return res.status(404).send();
			}
			res.send(user);
		} catch (error) {
			res.status(500).send(error);
		}
	}
}

module.exports = new UsersController();
