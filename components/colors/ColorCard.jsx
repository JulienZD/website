import { useState, useEffect } from 'react';
import styles from './ColorCard.module.css';

function OutlinedButton({ color }) {
  return (
    <button className="btn btn-sm mr-1" style={{ color: color, border: `1px solid ${color}` }} tabIndex="-1">
      Button
    </button>
  );
}

function ColoredCircle({ color }) {
  return (
    <>
      <span className="badge badge-pill ml-1" style={{ backgroundColor: color }}></span>
      <style jsx>{`
        .badge:empty {
          height: 15px;
          width: 15px;
          display: inline-block;
        }
      `}</style>
    </>
  );
}

function ColorDescriptor({ text, color }) {
  return (
    <small className="flex flex-nowrap items-center">
      <span className="whitespace-nowrap">{`${text}: ${color.toLowerCase()}`}</span>
      <ColoredCircle color={color} />
    </small>
  );
}

function CardFooter({ primary, secondary, onClick }) {
  const [copyBtn, setCopyBtnText] = useState({ icon: 'clipboard', title: 'Copy to clipboard' });
  const toClipboard = async () => {
    if (copyBtn.icon !== 'clipboard') return;
    await navigator.clipboard.writeText(`background-color: ${primary};\ncolor: ${secondary};`);
    setCopyBtnText({ icon: 'check2', title: 'Copied!' });
  };

  useEffect(() => {
    if (copyBtn.icon === 'clipboard') return;
    const timeout = setTimeout(() => setCopyBtnText({ icon: 'clipboard', title: 'Copy to clipboard' }), 2000);
    return () => clearTimeout(timeout);
  }, [copyBtn]);

  return (
    <div className={`${styles.cardFooter} row no-gutters justify-content-between bg-dark text-light`}>
      <div className="col d-flex flex-column">
        <ColorDescriptor text="Primary" color={primary} />
        <ColorDescriptor text="Secondary" color={secondary} />
      </div>
      <div className="col d-flex justify-content-end" style={{ color: 'var(--main-text)' }}>
        <button
          title={copyBtn.title}
          className={`btn-sm btn-link btn ${styles.button}`}
          onClick={toClipboard}
          aria-label={copyBtn.title}
        >
          <i className={`bi bi-${copyBtn.icon}`}></i>
        </button>
        <button className={`btn btn-sm btn-link ${styles.button}`} onClick={onClick} aria-label="Invert colors">
          <i className="bi bi-circle-half"></i>
        </button>
      </div>
    </div>
  );
}

export default function ColorCard({ primary, secondary }) {
  const [theme, setTheme] = useState({ primary: primary, secondary: secondary });

  const colorStyle = (background, foreground) => ({ backgroundColor: background, color: foreground });
  const getStyle = (alt) =>
    !alt ? colorStyle(theme.primary, theme.secondary) : colorStyle(theme.secondary, theme.primary);
  const swapColors = () => setTheme({ primary: theme.secondary, secondary: theme.primary });

  return (
    <article className={`card ${styles.card} bg-dark`}>
      <div className={`${styles.cardBody} ${styles.colorCard}`} style={getStyle()}>
        <hgroup>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
        </hgroup>
        <p>The quick brown fox jumps over the lazy dog</p>
        <div className="d-flex mt-1">
          <OutlinedButton color={theme.secondary} />
          <button className="btn btn-sm mr-1" style={getStyle(true)} tabIndex="-1">
            Button
          </button>
        </div>
      </div>
      <CardFooter primary={theme.primary} secondary={theme.secondary} onClick={swapColors} />
    </article>
  );
}
