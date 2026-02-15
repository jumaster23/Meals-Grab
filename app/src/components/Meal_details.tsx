import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function MealDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [meal, setMeal] = useState<any>()

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setMeal(data.meals[0]))
  }, [id])

  if (!meal) return <div className="p-10">Loading...</div>

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 bg-white cursor-pointer text-orange-600 px-4 py-2 rounded-lg hover:bg-green-950 hover:text-white">
        ← Back
      </button>
      
      <div className="bg-white rounded-3xl p-8 text-black">
        <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-2xl object-cover" />
          </div>
          <div >
        <h2 className="text-2xl font-bold text-orange-600 border-b-2 border-orange-200 pb-2">Instructions</h2>
        <div className="linear-to-br from-orange-50 to-yellow-50 p-6 rounded-xl shadow-inner">
        <p className="whitespace-pre-line text-base leading-relaxed text-gray-800 text-justify">
          {meal.strInstructions}
            </p>
          </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-orange-600  border-orange-200 pb-2">Ingredients</h2>
        <ul className="grid grid-cols-2 gap-3">
          {Array.from({ length: 20 }).map((_, i) => {
        const ingredient = meal[`strIngredient${i + 1}`]
        const measure = meal[`strMeasure${i + 1}`]
        return ingredient ? (
          <li key={i} className="bg-linear-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="font-semibold text-orange-700">{measure}</span>
            <span className="text-gray-700 ml-2">{ingredient}</span>
          </li>
        ) : null
          })}
        </ul>
      </div>
    </div>
  )
}

export default MealDetail