import express from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
  forgotPassword,
  resetPassword,
} from "../controllers/user.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

const app = express.Router();

// POST request for registering a new user
app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);

// POST request for user login
app.post("/login", loginValidator(), validateHandler, login);

// POST request for initiating password reset
app.post("/forgot-password", forgotPassword);

// PUT request for resetting password
app.put("/api/v1/user/password/reset/:token", resetPassword);

// Middleware to ensure user is authenticated for the routes below
app.use(isAuthenticated);

// GET request to fetch user profile
app.get("/me", getMyProfile);

// GET request to logout
app.get("/logout", logout);

// GET request to search for users
app.get("/search", searchUser);

// PUT request to send a friend request
app.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

// PUT request to accept a friend request
app.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

// GET request to fetch user notifications
app.get("/notifications", getMyNotifications);

// GET request to fetch user friends
app.get("/friends", getMyFriends);

export default app;
