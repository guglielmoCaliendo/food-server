const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const data = require('./recipes.json');

const getRecipes = async (req, res) => {
  try {
    // const recipes = await axios(
    //   'https://radiant-inlet-02005.herokuapp.com/results'
    // )
    //   .then((res) => res.data)
    //   .catch((err) => err.message);

    const recipes = data.results;

    const dbRecipes = JSON.parse(
      JSON.stringify(await Recipe.findAll({ include: Diet }))
    );

    const formatedDBRecipes = await dbRecipes.map((recipe) => ({
      ...recipe,
      diets: recipe.diets.map((diet) => diet.name),
    }));

    res.send([...formatedDBRecipes, ...recipes]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getRecipes;
