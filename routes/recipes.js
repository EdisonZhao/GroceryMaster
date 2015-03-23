/**
 * Created by Edison on 2015-03-22.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1/gmaster');
var schema = mongoose.Schema;
var gm_recipes = mongoose.model('gm_recipes', {
    _id: schema.ObjectId,
    name: String,
    ingredients: String,
    url: String,
    image: String,
    ts: Date,
    cookTime: String,
    source: String,
    recipeYield: String,
    datePublished: String,
    prepTime: String,
    description: String
});

// Get All Recipe Previews
router.get('/', function(req, res, next) {
    gm_recipes
        .find()
        .limit(10)
        .exec(function(err, recipes) {
            res.send(recipes);
        });
});

//Get a recipe item
router.get('/:recipeId', function(req, res, next) {
    gm_recipes
        .findOne({'_id' : req.params.recipeId}, function(err, recipe) {
            res.locals = {
                name: recipe.name,
                image_url: recipe.image,
                ingredients: recipe.ingredients,
                cook_time: recipe.cookTime
            };
            res.render('index', {
                partials: {
                    div_recipe: 'div_recipe'
            }});
    });
});

module.exports = router;
