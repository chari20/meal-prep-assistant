import { useState } from 'react';
import styles from './AddFitnessGoal.module.css';
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
    account: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
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
    onUpdate('account', updatedData.account);
  }

  return (
    <div className={styles.wrapper}>
      {/* ── YOUR GOALS ── */}
      <div className={styles.section}>
        <span className={styles['section-label']}>What is your goal?</span>
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

        <span className={styles['section-label']}>
          How fast do you want to reach your goal?
        </span>
        <div className={styles.cards}>
          <div className={styles.card}>
            <input
              type="radio"
              name="speed_goal"
              value="fast"
              checked={fitnessData.fitness_goal.speed === 'fast'}
              onChange={(e) => handleChange(e, 'fitness_goal', 'speed')}
            />
            <label>Fast 🔥</label>
          </div>
          <div className={styles.card}>
            <input
              type="radio"
              name="speed_goal"
              value="moderate"
              checked={fitnessData.fitness_goal.speed === 'moderate'}
              onChange={(e) => handleChange(e, 'fitness_goal', 'speed')}
            />
            <label>Moderate 💪</label>
          </div>
          <div className={styles.card}>
            <input
              type="radio"
              name="speed_goal"
              value="slow"
              checked={fitnessData.fitness_goal.speed === 'slow'}
              onChange={(e) => handleChange(e, 'fitness_goal', 'speed')}
            />
            <label>Slow & Steady 🐢</label>
          </div>
        </div>
      </div>

      {/* ── YOUR BODY ── */}
      <div className={styles.section}>
        <span className={styles['section-label']}>Your Body</span>

        <div className={styles['metrics-row']}>
          <div className={styles['form-group']}>
            <label>Age</label>
            <input
              type="number"
              min="0"
              name="age"
              value={fitnessData.body_metrics.age}
              onChange={(e) => handleChange(e, 'body_metrics', 'age')}
            />
          </div>
          <div className={styles['form-group']}>
            <label>Weight (lbs)</label>
            <input
              type="number"
              min="0"
              name="weight"
              value={fitnessData.body_metrics.weight}
              onChange={(e) => handleChange(e, 'body_metrics', 'weight')}
            />
          </div>
          <div className={styles['form-group']}>
            <label>Height (ft)</label>
            <input
              type="number"
              min="0"
              name="height"
              value={fitnessData.body_metrics.height}
              onChange={(e) => handleChange(e, 'body_metrics', 'height')}
            />
          </div>
        </div>

        <span className={styles['section-label']} style={{ marginTop: '16px' }}>
          Gender
        </span>
        <div className={styles.cards}>
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
        </div>

        <div className={styles['form-group']} style={{ marginTop: '16px' }}>
          <label>Activity Level</label>
          <select
            className={styles.dropdown}
            name="activity_level"
            onChange={(e) => handleChange(e, 'body_metrics', 'activity_level')}
          >
            {activity_level.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── CREATE YOUR ACCOUNT ── */}
      <div className={styles['account-section']}>
        <p className={styles['account-title']}>🔐 Create Your Account</p>
        <div className={styles['account-fields']}>
          <div className={styles['form-group']}>
            <label>Full Name</label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={fitnessData.account.full_name}
              onChange={(e) => handleChange(e, 'account', 'full_name')}
              placeholder="John Doe"
            />
          </div>
          <div className={styles['form-group']}>
            <label>Email</label>
            <input
              type="email"
              value={fitnessData.account.email}
              onChange={(e) => handleChange(e, 'account', 'email')}
              placeholder="john@example.com"
            />
          </div>
          <div className={styles['form-group']}>
            <label>Password</label>
            <input
              type="password"
              value={fitnessData.account.password}
              onChange={(e) => handleChange(e, 'account', 'password')}
              placeholder="••••••••"
            />
          </div>
          <div className={styles['form-group']}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={fitnessData.account.confirm_password}
              onChange={(e) => handleChange(e, 'account', 'confirm_password')}
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
