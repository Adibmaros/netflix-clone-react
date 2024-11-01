const express = require("express");
const router = express.Router();
const MovieController = require("../controller/index.controller");
const checkAuth = require("../utils/auth");

router.get("/my-movies/:email/:token", checkAuth, MovieController.getFavoriteMovies);
router.post("/my-movies", checkAuth, MovieController.addFavoriteMovies);
router.delete("/my-movies", checkAuth, MovieController.removeFavoriteMovies);
router.post("/my-movies/check", checkAuth, MovieController.checkFavoriteMovie);

// token

// sign in dengan token baru
router.post("/my-token", MovieController.signInToken);

// sign out tanpa token
router.delete("/my-token", checkAuth, MovieController.signOutToken);

// sign up tanpa token
router.post("/sign-up", MovieController.signUpUser);
module.exports = router;
