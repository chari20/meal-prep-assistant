import { useState } from 'react'
import { cuisines } from '../../utils/constant'

export default function SelectCuisine({ data, onUpdate }) {
    const [selected, setSelected] = useState(data || [])
    

    function handleSelect(cuisineName) {
        let newSelected
        if (selected.some(item => item.id === cuisineName.id)) {
            newSelected = selected.filter(item => item.id !== cuisineName.id)
        } else {
            newSelected = [...selected, cuisineName]
        }
        setSelected(newSelected)
        onUpdate('preferred_cuisine', newSelected)
    }
const isSelected = (cuisine) => selected.some(item => item.id === cuisine.id)


    return (
        <div className="cards">
            {cuisines.map((cuisine) => (
                <div
                    className={`card ${isSelected(cuisine) ? 'selected' : ''}`}
                    key={cuisine.id}
                    onClick={() => handleSelect(cuisine)}
                    style={{ cursor: 'pointer' }}
                >
                    
                    {cuisine.emoji}
                    {cuisine.name}
                        
                    
                </div>

            ))}
            
        </div>
    )
}



