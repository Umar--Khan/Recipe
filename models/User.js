const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

// Schemea for User
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "cant be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidtor, { message: "is already taken." });

// Securing Password
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

// Checking password
UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

// Genreate a JWT token
UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

// Check token
UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

// Profile Page output
UserSchema.methods.toProfileJSONFor = function(user) {
  return {
    _id: this._id,
    username: this.username,
    bio: this.bio,
    image: this.image || "http://i.imgur.com/AItCxSs.jpg",
    following: false // we'll implement following functionality
  };
};

// Favoriting
UserSchema.methods.favorite = function(id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }

  return this.save();
};

//Unfavoriting
UserSchema.methods.unfavorite = function(id) {
  this.favorites.remove(id);
  return this.save();
};

//Check for favorting
UserSchema.methods.isFavorite = function(id) {
  return this.favorites.some(function(favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

mongoose.model("User", UserSchema);
