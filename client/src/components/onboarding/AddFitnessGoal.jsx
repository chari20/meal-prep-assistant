import { useState } from 'react';
import styles from './SelectMealPrepStyle.module.css';
import { activity_level } from '../../utils/constant';

export default function AddFitnessGoal({ onUpdate }) {
  const [fitnessData, setFitnessData] = useState({
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

  function handleChange(event, section, field) {
    const value = event.target.value;

    const updatedSection = {
      ...fitnessData[section],
      [field]: value,
    };

    const updatedData = {
      ...fitnessData,
      [section]: updatedSection,
    };

    setFitnessData(updatedData);
    onUpdate('body_metrics', updatedData.body_metrics);
    onUpdate('fitness_goal', updatedData.fitness_goal);
  }

  return (
    <div>
      {/* Goal cards — lose / maintain / gain */}
      <span className={styles['section-label']}>Select Goals</span>

      <div className={styles.cards}>
        <div className={styles.card}>
          <input
            type="radio"
            name="goal"
            value="lose"
            checked={fitnessData.fitness_goal.goal === 'lose'}
            onChange={(e) => handleChange(e, 'fitness_goal', 'goal')}
          />
          <label>Lose Weight</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="goal"
            value="maintain"
            checked={fitnessData.fitness_goal.goal === 'maintain'}
            onChange={(e) => handleChange(e, 'fitness_goal', 'goal')}
          />
          <label>Maintenance</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="goal"
            value="gain"
            checked={fitnessData.fitness_goal.goal === 'gain'}
            onChange={(e) => handleChange(e, 'fitness_goal', 'goal')}
          />
          <label>Bulking</label>
        </div>
      </div>
      {/* Age input */}
      <div>
        <label>Age</label>
        <input
          type="number"
          min="0"
          name="age"
          value={fitnessData.body_metrics.age}
          onChange={(e) => handleChange(e, 'body_metrics', 'age')}
        />
      </div>

      {/* Gender radio */}
      <div className={styles.card}>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={fitnessData.body_metrics.gender === 'female'}
          onChange={(e) => handleChange(e, 'body_metrics', 'gender')}
        />
        <label>Female</label>
      </div>
      <br />
      <div className={styles.card}>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={fitnessData.body_metrics.gender === 'male'}
          onChange={(e) => handleChange(e, 'body_metrics', 'gender')}
        />
        <label>Male</label>
      </div>
      {/* Weight input */}
      <div>
        <label>Weight</label>
        <input
          type="number"
          min="0"
          name="Weight"
          value={fitnessData.body_metrics.weight}
          onChange={(e) => handleChange(e, 'body_metrics', 'weight')}
        />
      </div>
      {/* Height input */}
      <div>
        <label>Height</label>
        <input
          type="number"
          min="0"
          name="height"
          value={fitnessData.body_metrics.height}
          onChange={(e) => handleChange(e, 'body_metrics', 'height')}
        />
      </div>
      {/* Activity dropdown */}
      <div>
        <label for="activity_level">Activity Level:</label>

        <select
          name="activity level"
          id="activity_level_id"
          onChange={(e) => handleChange(e, 'body_metrics', 'activity_level')}
        >
          {activity_level.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      {/* Speed cards — fast / moderate / slow */}
      <span className={styles['section-label']}>Select Goals</span>

      <div className={styles.cards}>
        <div className={styles.card}>
          <input
            type="radio"
            name="speed_goal"
            value="fast"
            checked={fitnessData.fitness_goal.speed === 'fast'}
            onChange={(e) => handleChange(e, 'fitness_goal', 'speed')}
          />
          <label>fast</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="speed_goal"
            value="moderate"
            checked={fitnessData.fitness_goal.speed === 'moderate'}
            onChange={(e) => handleChange(e, 'fitness_goal', 'speed')}
          />
          <label>moderate</label>
        </div>
        <br />
        <div className={styles.card}>
          <input
            type="radio"
            name="speed_goal"
            value="slow"
            checked={fitnessData.fitness_goal.speed === 'slow'}
            onChange={(e) => handleChange(e, 'fitness_goal', 'speed')}
          />
          <label>slow</label>
        </div>
      </div>
    </div>
  );
}
