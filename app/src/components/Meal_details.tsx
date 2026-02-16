import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Meal } from '../types/Meals_types'

function MealDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState<Meal | null>(null)

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals[0]))
  }, [id])

  if (!meal) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-2xl font-semibold text-orange-600 animate-pulse">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-amber-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
     
        <button 
          onClick={() => navigate('/')}
          className="mb-6 bg-white cursor-pointer text-orange-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-orange-600 hover:text-white transition-all duration-300 flex items-center gap-2">
          <span>←</span> Back to Home
        </button>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
      
          <div className="bg-linear-to-r from-orange-500 to-amber-500 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{meal.strMeal}</h1>
            <div className="flex gap-3 flex-wrap">
              {meal.strCategory && (
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  🌍 {meal.strArea}
                </span>
              )}
            </div>
          </div>

          <div className="p-8">
            
          
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              
   
              <div className="relative group">
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                  className="w-full h-full object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
      
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">👨‍🍳</span>
                  <h2 className="text-3xl font-bold text-orange-600">Instructions</h2>
                </div>
                <div className="bg-linear-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl border-l-4 border-orange-500 max-h-96 overflow-y-auto custom-scrollbar">
                  <p className="whitespace-pre-line text-base leading-relaxed text-gray-800">
                    {meal.strInstructions}
                  </p>
                </div>
              </div>
            </div>
            
     
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🥘</span>
                <h2 className="text-3xl font-bold text-orange-600">Ingredients</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 20 }).map((_, i) => {
                  const ingredient = meal[`strIngredient${i + 1}`]
                  const measure = meal[`strMeasure${i + 1}`]
                  return ingredient ? (
                    <div 
                      key={i} 
                      className="bg-linear-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 px-4 py-3 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-default">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">•</span>
                        <div>
                          <span className="font-bold text-orange-700 block">{ingredient}</span>
                          <span className="text-gray-600 text-sm">{measure}</span>
                        </div>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>

        
            {meal.strYoutube && (
              <div className="mt-10 text-center">
                <a 
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-2xl">▶</span>
                  Watch on Youtube
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default MealDetail