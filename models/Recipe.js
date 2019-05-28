const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const User = mongoose.model("User");
var _ = require("lodash");

const RecipeSchema = new mongoose.Schema({
  idMeal: { type: Number, index: true, unique: true },
  strMeal: String,
  strCategory: String,
  strArea: String,
  strInstructions: String,
  strMealThumb: String,
  strTags: String,
  strYoutube: String,
  IngredientsArr: Array,
  MeasurementsArr: Array,
  strSource: String
});

RecipeSchema.plugin(uniqueValidator, { message: "can't be same ID" });

const randomMultiple = (min, max, multiple) => {
  return (
    Math.floor(Math.random() * ((max - min) / multiple + 1)) * multiple + min
  );
};

const titleCase = arr => {
  splitStr = arr.map(test => (test ? _.startCase(test) : (test = "")));
  return splitStr;
};

const checkforNull = arr => {
  if (typeof value === "array") {
    return arr.map(test => (test ? test : (test = "")));
  } else if (!arr) {
    arr = "";
  }
};

RecipeSchema.methods.toJSONFor = function(user) {
  return {
    _id: this._id,
    // idMeal: this.idMeal,
    // favorited: user ? user.isFavorite(this._id) : false,
    strMeal: this.strMeal,
    strCategory: this.strCategory,
    strArea: this.strArea,
    strInstructions: this.strInstructions,
    strMealThumb: this.strMealThumb,
    strTags: checkforNull(this.strTags),
    strYoutube: this.strYoutube,
    strSource: this.strSource,
    time: randomMultiple(10, 60, 5),
    IngredientsArr: titleCase(this.IngredientsArr),
    MeasurementsArr: checkforNull(this.MeasurementsArr),
    favoritesCount: this.favoritesCount
  };
};

RecipeSchema.methods.updateFavoriteCount = function() {
  const recipe = this;

  return User.count({ favorites: { $in: [recipe._id] } }).then(function(count) {
    recipe.favoritesCount = count;

    return recipe.save();
  });
};

mongoose.model("Recipe", RecipeSchema);
