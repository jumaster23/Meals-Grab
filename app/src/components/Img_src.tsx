import '../App.css'
import { useNavigate } from 'react-router-dom';
import type { Meal } from '../types/Meals_types';

interface SourceimgProps {
  meal: Meal;
}

function Sourceimg({ meal }: SourceimgProps) {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/meal/${meal.idMeal}`)}
      className="group bg-white rounded-3xl w-80 h-96 p-6 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
      
      {/* Image with overlay on hover */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={meal.strMealThumb} 
          alt={meal.strMeal} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white font-bold text-2xl block mb-2">View Recipe</span>
            <span className="text-white/80 text-sm">Click to see details →</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl text-gray-800 font-bold mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
        {meal.strMeal}
      </h3>
      
      {meal.strCategory && (
        <span className="inline-block bg-linear-to-r from-orange-100 to-yellow-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
          {meal.strCategory}
        </span>
      )}
    </div>
  )
}

export default Sourceimg