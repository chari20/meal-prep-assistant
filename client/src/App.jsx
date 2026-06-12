import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    calories: "",
    protein: "",
    preferences: "",
    dislike: "",
    ingredients: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Loading..");

    try {
      const response = await fetch("http://localhost:3001/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json();
      setResult(data.mealPlan)
      
    } catch (error){
      setResult("Something went wrong. Is the server running?");
      console.error(error);
      
    } 
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>
      <h1>🥗 AI Meal Prep Assistant</h1>

      <form onSubmit={handleSubmit}>
        <label>Calorie Goal</label>
        <input name="calories" value={formData.calories} onChange={handleChange} placeholder="e.g. 2000" />

        <label>Protein Goal (g)</label>
        <input name="protein" value={formData.protein} onChange={handleChange} placeholder="e.g. 150" />

        <label>Food Preferences</label>
        <input name="preferences" value={formData.preferences} onChange={handleChange} placeholder="e.g. high protein, Mediterranean" />

        <label>Dislikes / Allergies</label>
        <input name="dislikes" value={formData.dislikes} onChange={handleChange} placeholder="e.g. shellfish, cilantro" />

        <label>Available Ingredients</label>
        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="e.g. chicken breast, rice, broccoli, olive oil" rows={3} />

        <button type="submit">Generate Meal Plan</button>
      </form>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Your Meal Plan</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

export default App
