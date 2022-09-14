module.exports = app => {
    const userController = require("../controllers/user.controller.js");
    var router = require("express").Router();

  	/** GET /api/users */
	router.route('/').get(userController.find);

	/** GET /api/users/:userId */
	/** Authenticated route */
	router.route('/:userId').get(userController.get);

	/** POST /api/users */
	router.route('/').post(userController.create);

	router.route('/verify').post(userController.verify);

	/** PATCH /api/users/:userId */
	/** Authenticated route */

  	app.use("/api/user", router);
};
