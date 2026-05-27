const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const cardsPath = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
	fs.readFile(cardsPath, "utf8", (err, data) => {
		if (err) {
			return res
				.status(500)
				.send({ message: "An error has ocurred on the server" });
		}
		return res.send(JSON.parse(data));
	});
});

module.exports = router;
