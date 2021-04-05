import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import styles from './index.module.css';

import useUnfocus from '@hooks/useUnfocus';

// Immproved component of https://codesandbox.io/s/opmco?file=/src/PopoverPicker.js
export default function PopoverPicker({ color, onChange, onClose }) {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => {
    onClose();
    toggle(false);
  }, [color]);
  useUnfocus(popover, close);

  const ariaOpen = (event) => {
    if (event.code !== 'Space' && event.code !== 'Enter') return;
    event.preventDefault();
    toggle(true);
  };

  return (
    <div className={styles.picker}>
      <div
        className={`${styles.swatch} focus:ring-2 focus:ring-secondary`}
        style={{ backgroundColor: color }}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        onKeyDown={ariaOpen}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
