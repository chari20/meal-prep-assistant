import { useState } from 'react'
import { cuisines } from '../../utils/constant'

export default function SelectCuisine({ data, onUpdate }) {
    const [selected, setSelected] = useState(data || [])

    function handleSelect(cuisineName) {
        let newSelected
        if (selected.includes(cuisineName)) {
            newSelected = selected.filter(item => item.id !== cuisineName.id)
        } else {
            newSelected = [...selected, cuisineName]
        }
        setSelected(newSelected)
        onUpdate('preferred_cuisine', newSelected)
    }

    return (
        <div className="cards">
            {cuisines.map((cuisine) => (
                <div className="card" key={cuisine.id}>
                    {cuisine.emoji}
                    {cuisine.name}
                    <button onClick={() =>handleSelect(cuisine)}>
                        +
                    </button>
                    
                </div>

            ))}
            
        </div>
    )
}