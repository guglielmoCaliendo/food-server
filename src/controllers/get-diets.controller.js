const axios = require('axios');
const { Diet } = require('../db.js');
const data = require('./recipes.json');

const getDiets = async (req, res) => {
  try {
    // const diets = await axios(
    //   'https://radiant-inlet-02005.herokuapp.com/diets'
    // ).then((res) => res.data);

    const diets = data.diets;

    const dbDiets = await Diet.findAll();

    if (!dbDiets.length)
      diets.map(async (diet, i) => {
        return await Diet.create({
          id: i + 1,
          name: diet,
        });
      });

    res.send(diets);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getDiets;
