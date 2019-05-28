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

router.param("recipe", function(req, res, next, idMeal) {
  Recipe.findOne({ idMeal: idMeal })
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
  return res.json({ recipe: req.recipe.toJSONFor() });
});

// router.param("search", function(req, res, next, search) {
//   Recipe.find({ strCategory: search })
//     .populate("recipe")
//     .then(function(recipe) {
//       if (!recipe) {
//         return res.sendStatus(404);
//       }
//       req.recipe = recipe;
//       return next();
//     })
//     .catch(next);
// });

router.get("/search/:search", function(req, res) {
  Recipe.find(
    {
      strIngredient1: { $in: req.params.search }
    },
    function(err, results) {
      if (!err) {
        const finalResults = results.map(result => result.toJSONFor());
        res.json({ recipes: results });
      } else {
        throw err;
      }
    }
  );
});

//! Clean DB
// Recipe.collection.drop();

module.exports = router;
