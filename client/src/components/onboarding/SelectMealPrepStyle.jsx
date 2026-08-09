import { useState, useEffect } from 'react';
import styles from './SelectMealPrepStyle.module.css';

export default function SelectMealPrepStyle({ onUpdate, formError }) {
  const [selectedMealPrepStyle, setSelectedMealPrepStyle] = useState({
    prep_time: '', // string — one value "under 30" | "under 1 hour" | "unlimited"
    days: 0, // number — one value 3 | 5 | 7
    meals_per_day: [], // array — multiple values ["breakfast", "lunch", "dinner"]
  });

  // handles prep_time — sets a string
  function handlePrepTime(event) {
    const { value } = event.target;
    console.log('handlePrepTime', value);

    setSelectedMealPrepStyle({
      ...selectedMealPrepStyle,
      prep_time: value,
    });
  }

  function handleDays(event) {
    const { value } = event.target;
    console.log('handleDays', value);

    setSelectedMealPrepStyle({
      ...selectedMealPrepStyle,
      days: Number(value),
    });
  }

  // handles meals_per_day — toggles array
  function handleMealType(event) {
    const name = event.target.name;

    const exists = selectedMealPrepStyle.meals_per_day.includes(name);
    console.log(exists);
    let newMeals;
    if (exists) {
      newMeals = selectedMealPrepStyle.meals_per_day.filter(
        (item) => item !== name
      );
    } else {
      newMeals = [...selectedMealPrepStyle.meals_per_day, name];
    }
    console.log('newMeals', newMeals);

    setSelectedMealPrepStyle({
      ...selectedMealPrepStyle,
      meals_per_day: newMeals,
    });
  }

  const handleSubmit = (event) => {
    alert(`Your favorite fruit is: ${selectedMealPrepStyle}`);
    event.preventDefault();
  };

  useEffect(() => {
    const updateMealPrepStyle = {
      ...selectedMealPrepStyle,
    };
    onUpdate('meal_prep_style', updateMealPrepStyle);
  }, [selectedMealPrepStyle]);

  return (
    <form onSubmit={handleSubmit}>
      {formError.meal_prep_style && <p> At lest one selection is required</p>}
      {/* section 1 */}
      <span className={styles['section-label']}>Select Desired Prep Time </span>

      <div className={styles.cards}>
        <div className={styles.card}>
          <input
            type="radio"
            name="prep_time"
            value="less-then-30-minutes"
            checked={selectedMealPrepStyle.prep_time === 'less-then-30-minutes'}
            onChange={handlePrepTime}
          />
          <label>Less Than 30 minutes</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="prep_time"
            value="under-one-hour"
            checked={selectedMealPrepStyle.prep_time === 'under-one-hour'}
            onChange={handlePrepTime}
          />
          <label>Under 1 hour</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="prep_time"
            value="unlimited"
            checked={selectedMealPrepStyle.prep_time === 'unlimited'}
            onChange={handlePrepTime}
          />
          <label>Unlimited</label>
        </div>
      </div>
      {/* section 2 */}
      <span className={styles['section-label']}>
        Select Desired Meal Amount
      </span>
      <div className={styles.cards}>
        <div className={styles.card}>
          <input
            type="radio"
            name="days"
            value={3}
            checked={selectedMealPrepStyle.days === 3}
            onChange={handleDays}
          />
          <label>3</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="days"
            value={5}
            checked={selectedMealPrepStyle.days === 5}
            onChange={handleDays}
          />
          <label>5</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="days"
            value={7}
            checked={selectedMealPrepStyle.days === 7}
            onChange={handleDays}
          />
          <label>7</label>
        </div>
      </div>

      {/* section 3 */}
      <span className={styles['section-label']}>Select Desired Meal Types</span>
      <div className={styles.cards}>
        <div className={styles.card}>
          <label>Breakfast</label>

          <input
            type="checkbox"
            name="breakfast"
            checked={selectedMealPrepStyle.meals_per_day.includes('breakfast')}
            onChange={handleMealType}
          />
        </div>
        <br />
        <div className={styles.card}>
          <label>Lunch</label>

          <input
            type="checkbox"
            name="lunch"
            checked={selectedMealPrepStyle.meals_per_day.includes('lunch')}
            onChange={handleMealType}
          />
        </div>
        <br />
        <div className={styles.card}>
          <label>Dinner</label>

          <input
            type="checkbox"
            name="dinner"
            checked={selectedMealPrepStyle.meals_per_day.includes('dinner')}
            onChange={handleMealType}
          />
        </div>
      </div>
    </form>
  );
}
