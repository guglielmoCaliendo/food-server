const axios = require('axios');
const data = require('./recipes.json');

const getRecipesById = (req, res) => {
  const { id } = req.params;
  try {
    // const recipe = await axios(
    //   `https://radiant-inlet-02005.herokuapp.com/results/${id}`
    // )
    //   .then((res) => res.data)
    //   .catch((err) => err.message);
    console.log(data.results[0]);
    console.log(typeof id);

    const recipe = data.results.filter((recipe) => recipe.id == id);
    res.send(recipe[0]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getRecipesById;
