import React, { useState, useEffect } from 'react';
import axios from 'axios';
import delicon from '../../Assets/delete.png';
import './favourite.css';

const Favourite = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Fetch favorite recipes from backend 
    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-all-fav-recipes');
        setFavoriteRecipes(response.data); 
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    };

    fetchFavoriteRecipes();
  }, []);

  //  delete a recipe by ID
  const deleteRecipe = async (recipeId) => {
    try {
      
      await axios.delete(`http://localhost:3000/api/delete-fav-recipe/${recipeId}`);

      setFavoriteRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.idMeal !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className='fav-container'>
      <div className='home-body'>
        <div className='food-box'>
          {favoriteRecipes.map(recipe => (
            <div key={recipe.idMeal} className='category-details'>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className='food-img' />
              <div className='detailBox'>
                <div className='heqart-and'>
                  <p className='category-name'>{recipe.strCategory}</p>
                </div>
                <div className='delete-and-meal-name'>
                  <h2 className='meal-name'>{recipe.strMeal}</h2>
                  <img 
                    src={delicon} 
                    className='delete-icon' 
                    alt='delete'
                    onClick={() => deleteRecipe(recipe.idMeal)} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
