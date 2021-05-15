import React, { useEffect } from 'react';
import { Progress } from 'reactstrap';
import styles from './index.module.css';

function getPercentualEduProgress(): number {
  const startDate = new Date(2019, 8, 1);
  const endDate = new Date(2023, 5, 20);
  const totalEduTime = endDate.getTime() - startDate.getTime();
  const elapsedTime = Date.now() - startDate.getTime();
  const percentage = (elapsedTime / totalEduTime) * 100;
  return Number(percentage.toFixed(2));
}

export default function EduProgress(): JSX.Element {
  const [percentage, setPercentage] = React.useState(0);
  const tryUpdatePercentage = (): void => {
    const newPercentage = getPercentualEduProgress();
    if (newPercentage > percentage) {
      setPercentage(getPercentualEduProgress());
    }
  };

  useEffect(() => {
    setTimeout(() => setPercentage(getPercentualEduProgress()), 150);
  });

  useEffect(() => {
    const interval = setInterval(() => tryUpdatePercentage(), 10000);
    return (): void => clearInterval(interval);
  }, [percentage]);

  return (
    <Progress className={styles.progress} barClassName={styles.progressBar} value={percentage}>
      {percentage}%
    </Progress>
  );
}
