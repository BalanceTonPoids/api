const express = require("express");
const usersRoutes = require("./users");
const adminRoutes = require("./admin");
const dataScaleRoutes = require("./scale");

const router = express.Router();

const defaultRoutes = [
	{
		path: "/users",
		route: usersRoutes,
	},
	{
		path: "/admin",
		route: adminRoutes,
	},
	{
		path: "/data_scale",
		route: dataScaleRoutes,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
