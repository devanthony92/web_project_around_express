const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
	fs.readFile(usersPath, "utf8", (err, data) => {
		if (err) {
			return res
				.status(500)
				.send({ message: "An error has ocurred on the server" });
		}
		return res.send(JSON.parse(data));
	});
});

router.get("/:userId", (req, res) => {
	fs.readFile(usersPath, "utf8", (err, data) => {
		if (err) {
			return res
				.status(500)
				.send({ message: "An error has ocurred on the server" });
		}
		const users = JSON.parse(data);
		const { userId } = req.params;
		const user = users.find((u) => u._id === userId);

		if (!user) {
			return res.status(404).send({ message: "ID de usuario no encontrado" });
		}

		return res.send(user);
	});
});

module.exports = router;
