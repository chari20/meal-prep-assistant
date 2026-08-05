import { useState } from "react"
import { avoidFoods } from "../../utils/constant";
import Popup from "./Popup";

export default function SelectDislikeIngredient({ data, onUpdate }) {
    const [selected, setSelected] = useState(data || [])
    const [show, setShow] = useState(false)
    function handleSelect(cuisineName) {
        let newSelected
        if (selected.some(item => item.id === cuisineName.id)) {
            newSelected = selected.filter(item => item.id !== cuisineName.id)
        } else {
            newSelected = [...selected, cuisineName]
        }
        setSelected(newSelected)
        onUpdate('disliked_ingredients', newSelected)
    }
    const handleAddNewIngredient = () => {
        setShow(true)

    }
    const isSelected = (cuisine) => selected.some(item => item.id === cuisine.id)
    

    
    return (
            <div className="cards">
                {avoidFoods.map((cuisine) => (
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
            <div
                        className="card"
                        key="add card"
                        onClick={() => handleAddNewIngredient()}
                        style={{ cursor: 'pointer' }}
            >
                +

                    </div>
            
            
        <Popup
            show={show}
            onClose={() => setShow(false)}
                onSubmit={(value) => {
                    if (!value.trim()) return
                    let newIngredient = {
                        id: Date.now(), 
                        name: value
                    
                    }
                
                const newSelected = [...selected, newIngredient]
                setSelected(newSelected)
                onUpdate('disliked_ingredients', newSelected) 
                setShow(false);
            }}
            title="Add item"
            placeholder="e.g. Milk"
        />
            
                
            </div>
        )
    }
    