import React, { useEffect, useState } from 'react';
import './home.css';
import { GoHeart } from "react-icons/go";
import heart from '../../Assets/heart.svg'
import heartclick from '../../Assets/heartclick.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [data, setData] = useState([]);
  const [heartStates, setHeartStates] = useState({});

  const navigate = useNavigate();

 
  const toggleHeart = async (id) => {
    try {
      // Send the selected meal to the backend 
      await axios.post(`http://localhost:3000/api/add-selected-recipe/${id}`);
      
      // Update the heart state
      setHeartStates(prevState => ({
        ...prevState,
        [id]: !prevState[id]
      }));
    } catch (error) {
      console.error('Error adding selected recipe to favorites:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cook-web/GetAllRecipes');
        //  get 5 categories
        const categoriesSlice = response.data.slice(7, 12);
        setCategories(categoriesSlice || []);
      } catch (error) {
        // console.error('Error fetching categories:', error);
 
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleCategoryClick = async (category) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/meals/${category.strCategory}`);
      const responseData = response.data;
      // console.log('Response data:', responseData); 
      setData(responseData || []);
      setSelectedCategory(category.strCategory);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setData([]); 
    }
  };
  



  return (
    <div className='container-fluid home-container'>
      <div className='home-nav'>
        {categories.map((category, index) => (
          <button
            key={index}
            className='home-nav-button'
            onClick={() => handleCategoryClick(category)}
          >
            {category.strCategory}
          </button>
        ))}
      </div>

    
    {selectedCategory && (
      <div className='home-body'>
        <div className='food-box'>
          {[...new Set(data.map(item => item.idMeal))].map(idMeal => {
            const uniqueItem = data.find(item => item.idMeal === idMeal);
            return (
              <div key={uniqueItem.idMeal} className='category-details'  >
                <img src={uniqueItem.strMealThumb} alt={uniqueItem.strMeal} className='food-img' />
                <div className='detailBox'>
                  <div className='heqart-and'>
                  <p className='category-name'>{uniqueItem.strCategory}</p>
                  <img src={heartStates[uniqueItem.idMeal] ? heartclick : heart}
                    alt='heart'
                    className='heart'
                    onClick={() => toggleHeart(uniqueItem.idMeal)}
                  />
                  </div>
                  
                 
                  <h2 className='meal-name'>{uniqueItem.strMeal}</h2>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
    
</div>
  );
}

export default Home;
