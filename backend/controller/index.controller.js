const { ERR, OK } = require("../utils/response");
const User = require("../models/index.model");
const argon2 = require("argon2");

const getFavoriteMovies = async (req, res) => {
  return OK(res, 200, req.user, "get favorite movies success!");
};

const addFavoriteMovies = async (req, res) => {
  try {
    const { data } = req.body;
    const user = await User.findById(req.user._id);
    user.favoriteMovies.push(data);

    await user.save();
    OK(res, 201, user.favoriteMovies, "Favorite movie added successfully");
  } catch (error) {
    ERR(res, 500, "Error adding favorite movie...");
  }
};

const removeFavoriteMovies = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(req.user._id);
    const checkExisting = user.favoriteMovies.some((movie) => movie.id == id);

    if (!checkExisting) return ERR(res, 404, "movie doesnt exist!");
    user.favoriteMovies = user.favoriteMovies.filter((movie) => movie.id != id);
    await user.save();

    OK(res, 204, null, "Favorite movie removed successfully");
  } catch (error) {
    ERR(res, 500, "Failed removing favorite movie");
  }
};

const signInToken = async (req, res) => {
  try {
    const { email, password, token } = req.body;

    let user = await User.findOne({ email });
    if (!user) return ERR(res, 400, "User not found!");

    const isPasswordOk = await argon2.verify(user.password, password);
    if (!isPasswordOk) return ERR(res, 400, "Password wrong!");

    user.token = token;
    await user.save();
    OK(res, 200, null, "Token signed in successfully");
  } catch (error) {
    ERR(res, 500, "sign-in error");
  }
};

const signOutToken = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.token = null;
    await user.save();
    OK(res, 200, null, "Token signed out successfully");
  } catch (error) {
    return ERR(res, 400, "sign-out failed");
  }
};

const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body); // Log input
  try {
    const hashPassword = await argon2.hash(password);

    const user = await User.findOne({ email });
    if (user) {
      return ERR(res, 400, "Email sudah terdaftar ");
    }

    const addNewUser = new User({ email, password: hashPassword });
    await addNewUser.save();

    return OK(res, 200, { addNewUser }, "Sign-up success");
  } catch (error) {
    return ERR(res, 500, error.message, "Sign-up failed");
  }
};

const checkFavoriteMovie = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(req.user._id);
    const isFavorited = user.favoriteMovies.some((movie) => movie.id == id);
    OK(res, 200, isFavorited, "Check favorite movie by ID success");
  } catch (error) {
    return ERR(res, 500, "Error checking favorite movies");
  }
};

module.exports = {
  getFavoriteMovies,
  addFavoriteMovies,
  removeFavoriteMovies,
  signInToken,
  signOutToken,
  signUpUser,
  checkFavoriteMovie,
};
