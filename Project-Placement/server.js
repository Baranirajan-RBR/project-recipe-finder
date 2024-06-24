const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY';

app.use(cors());
app.use(express.json());

app.post('/api/recipes', async (req, res) => {
    const { ingredients } = req.body;
    if (!ingredients) {
        return res.status(400).send({ error: 'Ingredients are required' });
    }

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
            params: {
                ingredients,
                number: 10,
                apiKey: SPOONACULAR_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch recipes' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
