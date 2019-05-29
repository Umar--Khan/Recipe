const router = require("express").Router();
const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");
const auth = require("../auth");
const User = mongoose.model("User");

router.post("/", function(req, res, next) {
  const recipe = new Recipe(req.body.recipe);
  Recipe.findOne({ idMeal: recipe.idMeal });
  return recipe
    .save()
    .then(function() {
      return res.json({ recipe: recipe.toJSONfor });
    })
    .catch(next);
});

router.param("recipe", function(req, res, next, _id) {
  Recipe.findOne({ _id: _id })
    .populate("recipe")
    .then(function(recipe) {
      if (!recipe) {
        return res.sendStatus(404);
      }
      req.recipe = recipe;
      return next();
    })
    .catch(next);
});

router.get("/", function(req, res, next) {
  Recipe.find({}, function(err, result) {
    if (!err) {
      const finalResults = result.map(result => result.toJSONFor());
      res.json({ recipes: finalResults });
    } else {
      throw err;
    }
  });
});

router.get("/:recipe", function(req, res, next) {
  console.log(req.recipe);
  return res.json({ recipe: req.recipe.toJSONFor() });
});

// Filtering

router.get("/search/:search", function(req, res) {
  let search = req.params.search;
  if (search.includes("&")) {
    search = search.toLowerCase().split("&");
  } else {
    search = search.toLowerCase();
  }

  console.log(search);

  Recipe.find(
    {
      IngredientsArr: { $in: search }
    },
    function(err, results) {
      console.log(results);
      if (!err) {
        const finalResults = results.map(result => result.toJSONFor());
        res.json({ recipes: finalResults });
      } else {
        throw err;
      }
    }
  );
});

//Favourte an recipe
router.post("/:recipe/favorite", auth.optional, function(req, res, next) {
  const recipeId = req.recipe._id;
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }
      return user.favorite(recipeId).then(function() {
        return req.recipe.updateFavoriteCount().then(function(recipe) {
          return res.json({ recipe: recipe.toJSONFor(user) });
        });
      });
    })
    .catch(next);
});

// Unfavorite an recipe
router.delete("/:recipe/favorite", auth.optional, function(req, res, next) {
  const recipeId = req.recipe._id;

  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.unfavorite(recipeId).then(function() {
        return req.recipe.updateFavoriteCount().then(function(recipe) {
          return res.json({ recipe: recipe.toJSONFor(user) });
        });
      });
    })
    .catch(next);
});

//! Clean DB
// Recipe.collection.drop();

module.exports = router;
