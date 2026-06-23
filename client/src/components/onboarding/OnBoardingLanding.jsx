import { useReducer } from 'react';
import SelectCuisine from './SelectCuisine';
import SelectDislikeIngredient from './SelectDislikeIngredient'
import SelectMealPrepStyle from './SelectMealPrepStyle';
import AddFitnessGoal from './AddFitnessGoal'


const initialState = { step: 1 }

function reducer(state, action) {
    switch (action.type) {
        case 'NEXT_STEP':
            if (state.step == 4) {
                return state
            }
            return {step: state.step + 1}
        case 'PREV_STEP':
            if (state.step === 1) {
                return state
            }
            return { step: state.step - 1 }
        default:
            return state
        
    }

}


export default function OnboardingLanding() {
    const [state, dispatch] = useReducer(reducer, initialState)

    function renderStep() {
        switch(state.step) {
            case 1: return <SelectCuisine />
            case 2: return <SelectDislikeIngredient />
            case 3: return <SelectMealPrepStyle />
            case 4: return <AddFitnessGoal />
            default: return <SelectCuisine />
        }
    }

    return (
        <div>
            {renderStep()}
            <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
            <button onClick={() => dispatch({ type: 'NEXT_STEP' })}>Next</button>
        </div>
    )
}