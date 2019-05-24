const router = require("express").Router();
const mongoose = require("mongoose");
const Recipe = mongoose.model("Recipe");
// const User = mongoose.model("User");
const auth = require("../auth");

router.post("/", function(req, res, next) {
  const recipe = new Recipe(req.body.recipe);

  return recipe
    .save()
    .then(function() {
      return res.json({ recipe: recipe.toJSONfor });
    })
    .catch(next);
});

router.param("recipe", function(req, res, next, idMeal) {
  //   const fixId = idMeal.replace(/['"]+/g, "");

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
      res.json(result);
    } else {
      throw err;
    }
  });
});

router.get("/:recipe", function(req, res, next) {
  //   Promise.all([req.recipe.populate("recipe").execPopulate()])
  //     .then(function(results) {
  //       return res.json({ recipe: req.recipe.toJSONFor });
  //     })
  //     .catch(next);
  return res.json({ recipe: req.recipe.toJSONFor() });
});

module.exports = router;
