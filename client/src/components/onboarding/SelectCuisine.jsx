export default function SelectCuisine({ data, onUpdate }) {
    console.log("data", data)
    return (
        <div>
            <h2>Step 1 — Select Cuisine</h2>
            <button onClick={() => onUpdate('preferred_cuisine', ['Asian', 'Italian'])}>
                Test Update
            </button>
        </div>
    )
}