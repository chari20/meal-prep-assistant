import { useReducer, useState } from 'react';
import SelectCuisine from './SelectCuisine';
import SelectDislikeIngredient from './SelectDislikeIngredient';
import SelectMealPrepStyle from './SelectMealPrepStyle';
import AddFitnessGoal from './AddFitnessGoal';
import { checkForEmptyValues } from '../../utils/index';

const initialState = { step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      if (state.step == 4) {
        return state;
      }
      return { step: state.step + 1 };
    case 'PREV_STEP':
      if (state.step === 1) {
        return state;
      }
      return { step: state.step - 1 };
    default:
      return state;
  }
}

export default function OnboardingLanding() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formError, setFormError] = useState({
    user_name: false,
    preferred_cuisine: false,
    disliked_ingredients: false,
    meal_prep_style: false,
    goals: false,
  });

  const [formData, setFormData] = useState({
    user_name: '',
    preferred_cuisine: [],
    disliked_ingredients: [],
    meal_prep_style: {
      prep_time: '',
      days: 0,
      meals_per_day: ['breakfast', 'lunch', 'dinner'],
    },
    body_metrics: {
      age: 0,
      gender: '',
      weight: 0,
      height: 0,
      activity_level: '',
    },

    fitness_goal: {
      goal: '',
      speed: '',
      calorie_adjustment: 0,
    },
  });

  function handleUpdate(field, value) {
    setFormData({ ...formData, [field]: value });
    console.log('formData updated:', field, value);
  }

  function handleNext() {
    const result = checkForEmptyValues(formData);
    setFormError({ ...formError, [result.emptyPaths]: true });
    console.log('formData', result.emptyPaths);
    dispatch({ type: 'NEXT_STEP' });
  }

  function renderStep() {
    switch (state.step) {
      case 1:
        return (
          <SelectCuisine
            data={formData.preferred_cuisine}
            onUpdate={handleUpdate}
            formError={formError}
          />
        );
      case 2:
        return (
          <SelectDislikeIngredient
            data={formData.disliked_ingredients}
            onUpdate={handleUpdate}
            formError={formError}
          />
        );
      case 3:
        return (
          <SelectMealPrepStyle onUpdate={handleUpdate} formError={formError} />
        );
      case 4:
        return <AddFitnessGoal onUpdate={handleUpdate} formError={formError} />;
      default:
        return (
          <SelectCuisine
            data={formData.preferred_cuisine}
            onUpdate={handleUpdate}
            formError={formError}
          />
        );
    }
  }

  return (
    <div>
      {renderStep()}
      <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
      <button onClick={() => handleNext()}>Next</button>
    </div>
  );
}
