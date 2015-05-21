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
    if (req.query.q) {
        console.log(req.query);
        gm_recipes
            .find( { ingredients: new RegExp(req.query.q) } )
            .limit(10)
            .exec(function (err, recipes) {
                var html = '';
                recipes.forEach(function (recipe) {
                    html += '<div class="recipe-container"> \
                                <h1>' + recipe.name + '</h1> \
                                <img src="' + recipe.image + '"> \
                                <p>' + recipe.ingredients + '</p> \
                                <h1>' + recipe.cookTime + '</h1> \
                            </div>';
                });
                res.send(html);
            });
    }
    else {
        gm_recipes
            .find()
            .limit(10)
            .exec(function (err, recipes) {
                var html = '';
                recipes.forEach(function (recipe) {
                    html += '<div class="recipe-container"> \
                                <h1>' + recipe.name + '</h1> \
                                <img src="' + recipe.image + '"> \
                                <p>' + recipe.ingredients + '</p> \
                                <h1>' + recipe.cookTime + '</h1> \
                            </div>';
                });
                res.send(html);
            });
    }
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
