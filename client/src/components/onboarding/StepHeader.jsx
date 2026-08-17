export default function StepHeader({
  currentStep,
  totalSteps,
  title,
  subtitle,
}) {
  return (
    <div className="step-header">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-steps">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="progress-step-wrapper">
              <div
                className={`progress-dot ${i + 1 <= currentStep ? 'active' : ''}`}
              >
                {i + 1 < currentStep ? '✓' : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`progress-line ${i + 1 < currentStep ? 'active' : ''}`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="progress-label">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Title and Subtitle */}
      <div className="step-title-container">
        <h1 className="step-title">{title}</h1>
        <p className="step-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
