import React, { useEffect } from 'react';

function getPercentualEduProgress() {
  const startDate = new Date(2019, 8, 1);
  const endDate = new Date(2023, 5, 1);
  const now = new Date();
  const totalEduTime = endDate - startDate;
  const elapsedTime = now - startDate;
  const percentage = (elapsedTime / totalEduTime) * 100;
  return percentage.toFixed(2);
}

export default function EduProgressBar() {
  const [percentage, setPercentage] = React.useState(0);
  const tryUpdatePercentage = () => {
    const newPercentage = getPercentualEduProgress();
    if (newPercentage > percentage) {
      setPercentage(getPercentualEduProgress());
    }
  };

  useEffect(() => {
    document.querySelector('#progressContainer').addEventListener('animationstart', () => {
      setTimeout(setPercentage(getPercentualEduProgress()), 150);
    });
  });

  useEffect(() => {
    const interval = setInterval(() => tryUpdatePercentage(), 10000);
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div id="eduProgressBarWrapper" className="progress">
      <div
        id="eduProgressBar"
        className="progress-bar text-dark"
        role="progressbar"
        aria-valuenow={percentage}
        style={{ width: percentage + '%' }}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  );
}
