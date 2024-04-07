import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Recepi() {
  const [meal, setMeal] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/mealsByID/${id}`);
        setMeal(response.data);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    };

    fetchMealDetails();
  }, [id]); // Fetch meal details 

  return (
    <div>
      {meal ? (
        <div>
          <h1>{meal.strMeal}</h1>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strInstructions}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Recepi;
