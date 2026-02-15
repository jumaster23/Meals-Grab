import { useState, useEffect } from "react";
import random from "./assets/random.png";
import "./App.css";
import Sourceimg from "./components/Img_src";
import type { Meal } from './types/Meals_types';

function App() {
  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);

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
    <div className='min-h-screen bg-linear-to-br from-orange-50 to-yellow-50 p-10'>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-5xl font-bold text-orange-600 mb-8">Meal Finder</h1>
        
        <div className='flex gap-3 mb-10 max-w-2xl mx-auto'>
          <input 
            type="search" 
            placeholder="Search for a meal..." 
            className="border-2 border-orange-200 text-black rounded-xl px-6 py-3 w-full focus:outline-none focus:border-orange-400 transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            onClick={handleRandom}
            className='bg-white border-2 border-orange-200 px-4 py-3 rounded-xl cursor-pointer hover:bg-linear-to-r hover:from-amber-100 hover:to-orange-200 transition-all duration-300 shadow-sm'>
            <img src={random} alt="random" className="w-6 h-6" />
          </button>
        </div>
        
        {meals.length > 0 && (
          <div className="flex flex-wrap gap-6 justify-center">
            {meals.map((meal) => (
              <Sourceimg key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>  
    </div>
  )
}

export default App