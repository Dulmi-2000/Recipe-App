import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import cors from 'cors';
import axios from 'axios';
import { isValidObjectId } from 'mongoose';

const app = express();
const http = createServer(app);

app.use(express.json());
app.use(cors()); 

mongoose.connect('mongodb+srv://samanaliperera544:nyS4CrEMu6JKJrOr@cook-web-db.fjblsi4.mongodb.net/')


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

const recipeSchema = new mongoose.Schema({
    idCategory: {
        type: Number,
        required: true
    },
    strCategory: {
        type: String,
        required: true
    },
    strCategoryThumb: {
        type: String,
        required: true
    },
    strCategoryDescription: {
        type: String,
        required: true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

async function getItems() {
    try {
        const food = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const response = await food.json();
        for (let i = 0; i < response.length; i++) {
            const recipe = new Recipe({
                idCategory: response[i]['idCategory'],
                strCategory: response[i]['strCategory'],
                strCategoryThumb: response[i]['strCategoryThumb'],
                strCategoryDescription: response[i]['strCategoryDescription'],
            });
            await recipe.save();
        }
    } catch (error) {
        console.error('Error saving recipe:', error);
    }
}
getItems();


//get recipe of a category

app.get('/api/cook-web/GetRecipe/:strCategory', (request, response) => {
    const strCategory = request.params.strCategory;

    Recipe.findOne({ strCategory: strCategory })
        .then(recipe => {
            if (!recipe) {
                response.status(404).json({ error: 'Recipe not found' });
            } else {
                response.json(recipe);
            }
        })
        .catch(error => {
            console.error('Error fetching Recipe category:', error);
            response.status(500).json({ error: 'Internal server error' });
        });
});



//categories 
app.get('/api/cook-web/GetRecipeCategories', async (req, res) => {
  try {
    // Fetch distinct recipe categories from the database
    const categories = await Recipe.distinct('strCategory');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching recipe categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





//get all recipes 
app.get('/api/cook-web/GetAllRecipes', (req, res) => {

    Recipe.find()
        .then(recipes => {
            res.json(recipes); 
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
});





const fetchMeals = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
    const mealsData = response.data.meals;
    console.log(mealsData);
    
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
};

fetchMeals();






///alllllllllll
async function fetchRecipeMeals() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
      const mealsData = response.data.meals;
      console.log(mealsData);
     
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }
  
fetchRecipeMeals();
  










//  meal collection
const mealSchema = new mongoose.Schema({
    idMeal: String,
    strMeal: String,
    strCategory: String,
    strArea: String,
    strInstructions: String,
    strMealThumb: String,
   
  });
  
 
  const Meal = mongoose.model('Meal', mealSchema);
  
  async function fetchMealsAndSaveToDB() {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s');
      const mealsData = response.data.meals;
  
      for (const mealData of mealsData) {
        const meal = new Meal({
          idMeal: mealData.idMeal,
          strMeal: mealData.strMeal,
          strCategory: mealData.strCategory,
          strArea: mealData.strArea,
          strInstructions: mealData.strInstructions,
          strMealThumb: mealData.strMealThumb,
         
        });
        await meal.save(); // Save the meal to the db
      }
  
      console.log('Meals saved to database successfully!');
    } catch (error) {
      console.error('Error fetching and saving meals:', error);
    }
  }
  
fetchMealsAndSaveToDB();
  






//meals by category

  
  app.get('/api/meals/:category', async (req, res) => {
    const category = req.params.category;
  
    try {
      // Find meals by category from the database
      const meals = await Meal.find({ strCategory: category });
  
      if (meals.length === 0) {
        return res.status(404).json({ message: 'No meals found for this category.' });
      }
  
      res.json(meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  



//meals by id
app.get('/api/mealsByID/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const meal = await Meal.findOne({ idMeal: id });
      if (!meal) {
        return res.status(404).json({ error: "Meal not found" });
      }
      res.json(meal);
    } catch (error) {
      console.error('Error fetching meal details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  





//fav meals

// schema for favorite recipes
const favRecipeSchema = new mongoose.Schema({
    idMeal: String,
    strMeal: String,
    strCategory: String,
    strArea: String,
    strInstructions: String,
    strMealThumb: String,
  
});

const FavRecipe = mongoose.model('FavRecipe', favRecipeSchema);


app.post('/api/add-selected-recipe/:idMeal', async (req, res) => {
    try {
        const { idMeal } = req.params; 
        const recipeData = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const recipe = recipeData.data.meals[0];
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        const newFavRecipe = new FavRecipe({
            idMeal: recipe.idMeal,
            strMeal: recipe.strMeal,
            strCategory: recipe.strCategory,
            strArea: recipe.strArea,
            strInstructions: recipe.strInstructions,
            strMealThumb: recipe.strMealThumb,
            
        });
        await newFavRecipe.save();
        res.status(201).json({ message: 'Recipe added to favorites successfully' });
    } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// get all recipes from the favRecipe schema
app.get('/api/get-all-fav-recipes', async (req, res) => {
    try {
        const allFavRecipes = await FavRecipe.find(); 
        res.status(200).json(allFavRecipes); 
    } catch (error) {
        console.error('Error fetching all favorite recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







//  delete a recipe from the favRecipe schema by ID
app.delete('/api/delete-fav-recipe/:idMeal', async (req, res) => {
    try {
        const idMeal = req.params.idMeal; 
        console.log('Received recipe ID:', idMeal); 

        // Check if the recipe ID is valid
        if (!idMeal) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }

        // Convert the string ID to ObjectId
        const recipeId = mongoose.Types.ObjectId(idMeal);

        // Find the recipe by ID and delete it from the database
        const deletedRecipe = await FavRecipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting favorite recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Endpoint to fetch meal details by ID
app.get('/api/meals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await axios.get(`https://api/MealsById/${id}`);
    const meal = response.data;
    res.json(meal);
  } catch (error) {
    console.error('Error fetching meal details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


