import React, { useEffect } from 'react';
import { Progress } from 'reactstrap';
import styles from './index.module.css';

function getPercentualEduProgress(endDate) {
  const startDate = new Date(2019, 8, 1);
  const now = new Date();
  const totalEduTime = endDate - startDate;
  const elapsedTime = now - startDate;
  const percentage = (elapsedTime / totalEduTime) * 100;
  return percentage.toFixed(2);
}

export default function EduProgress({ endDate, container }) {
  const [percentage, setPercentage] = React.useState(0);
  const tryUpdatePercentage = () => {
    const newPercentage = getPercentualEduProgress(endDate);
    if (newPercentage > percentage) {
      setPercentage(getPercentualEduProgress(endDate));
    }
  };

  useEffect(() => {
    container.current.addEventListener('animationstart', () => {
      setTimeout(setPercentage(getPercentualEduProgress(endDate)), 150);
    });
  });

  useEffect(() => {
    const interval = setInterval(() => tryUpdatePercentage(), 10000);
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <Progress className={styles.progress} barClassName={styles.progressBar} value={percentage}>
      {percentage}%
    </Progress>
  );
}
