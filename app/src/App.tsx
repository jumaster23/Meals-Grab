import { useState, useEffect } from "react";
import random from "./assets/random.png";
import "./App.css";
import Sourceimg from "./components/Img_src";
import type { Meal } from './types/Meals_types';

function App() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);

  // Cargar comidas iniciales
  useEffect(() => {
    const fetchInitialMeals = async () => {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
      }
    };
    
    fetchInitialMeals();
  }, []);

  useEffect(() => {
    if (!search) return;

    const timer = setTimeout(async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const data = await res.json();
      
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleRandom = async () => {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    if (data.meals) {
      setMeals(data.meals);
      setSearch("");
    }
  };

  return (
    <div className='p-10 gap-4 flex flex-col'>
      <h1 className="text-center text-3xl font-bold">Meal Finder</h1>
      <div className='flex gap-1 flex-row'>
        <input 
          type="search" 
          placeholder="Search" 
          className="border-2 border-white rounded-lg px-4 py-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button 
          onClick={handleRandom}
          className='bg-white border-0 px-4 py-2 rounded-lg cursor-pointer hover:bg-linear-to-r hover:from-amber-100 hover:to-orange-200 transition-all duration-300'>
          <img src={random} alt="random" className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {meals.map((meal) => (
          <Sourceimg key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  )
}

export default App