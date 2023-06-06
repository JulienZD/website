import { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';
import styles from './index.module.css';
import { GRADUATION_DATE } from '@lib/constants';

function getPercentualEduProgress(): number {
  const startDate = new Date(2019, 8, 1);
  const totalEduTime = GRADUATION_DATE.getTime() - startDate.getTime();
  const elapsedTime = Date.now() - startDate.getTime();
  const percentage = (elapsedTime / totalEduTime) * 100;

  return Number(Math.min(100, percentage).toFixed(2));
}

export default function EduProgress(): JSX.Element {
  const [percentage, setPercentage] = useState(0);
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
