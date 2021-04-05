import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './index.module.css';

export default function HomeButton() {
  const boxAreaRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    boxAreaRef.current.addEventListener('click', () => linkRef.current.click());
  }, []);
  return (
    <div ref={boxAreaRef} id={styles.flipBox}>
      <div className={styles.flipBoxInner}>
        <div className={styles.flipBoxFront}>
          <Link href="/">
            <a ref={linkRef} className="j-link">
              <img src="/images/CircleJ.png" alt="Go to the homepage" width="36" />
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
