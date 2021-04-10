import React, { RefObject, useEffect } from 'react';
import { Progress } from 'reactstrap';
import styles from './index.module.css';

interface Props {
  endDate: Date;
  container: RefObject<HTMLDivElement>;
}

function getPercentualEduProgress(endDate: Date): number {
  const startDate = new Date(2019, 8, 1);
  const totalEduTime = endDate.getTime() - startDate.getTime();
  const elapsedTime = Date.now() - startDate.getTime();
  const percentage = (elapsedTime / totalEduTime) * 100;
  return Number(percentage.toFixed(2));
}

export default function EduProgress({ endDate, container }: Props): JSX.Element {
  const [percentage, setPercentage] = React.useState(0);
  const tryUpdatePercentage = (): void => {
    const newPercentage = getPercentualEduProgress(endDate);
    if (newPercentage > percentage) {
      setPercentage(getPercentualEduProgress(endDate));
    }
  };

  useEffect(() => {
    if (!container.current) return;
    container.current.addEventListener('animationstart', () => {
      setTimeout(() => setPercentage(getPercentualEduProgress(endDate)), 150);
    });
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
