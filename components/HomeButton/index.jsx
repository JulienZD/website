import { useEffect } from 'react';
import Link from 'next/link';
import styles from './index.module.css';

export default function HomeButton() {
  useEffect(() => {
    const buttonArea = document.querySelector(`#${styles.flipBox}`);
    const mainLink = buttonArea.querySelector('a');
    buttonArea.addEventListener('click', handleClick);

    function handleClick(e) {
      mainLink.click();
    }
  });
  return (
    <div id={styles.flipBox}>
      <div className={styles.flipBoxInner}>
        <div className={styles.flipBoxFront}>
          <Link href="/">
            <a className="j-link">
              <img src="images/CircleJ.png" alt="Go to the homepage" width="36" />
            </a>
          </Link>
        </div>
        <div className={styles.flipBoxBack}>
          <p>Home</p>
        </div>
      </div>
    </div>
  );
}
