import '../App.css'
import { useNavigate } from 'react-router-dom';
import type { Meal } from '../types/Meals_types';

interface SourceimgProps {
  meal: Meal;
}

function Sourceimg({ meal }: SourceimgProps) {
  const navigate = useNavigate();
  return (
    <>
      <div 
        onClick={() => navigate(`/meal/${meal.idMeal}`)}
        className="bg-white rounded-3xl w-80 h-80 p-6 cursor-pointer border-amber-50 shadow-xs hover:bg-linear-to-r hover:from-yellow-100 hover:to-orange-400 transition-all duration-300">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl text-black font-bold mb-2">{meal.strMeal}</h3>
      </div>
    </>
  )
}

export default Sourceimg