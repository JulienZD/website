import React from 'react';
import styles from './ColorCard.module.css';

function OutlinedButton({ color }) {
  return (
    <button className="btn btn-sm mr-1" style={{ color: color, border: `1px solid ${color}` }}>
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
          vertical-align: middle;
        }
      `}</style>
    </>
  );
}

const ColorDescriptor = ({ text, color }) => {
  return (
    <small>
      <span>
        {text}: {color.toLowerCase()}
      </span>
      <ColoredCircle color={color} />
    </small>
  );
};

function CardFooter({ primary, secondary, onClick }) {
  return (
    <div className={`${styles.cardFooter} row no-gutters justify-content-between bg-dark text-light`}>
      <div className="d-flex flex-column">
        <ColorDescriptor text="Primary" color={primary} />
        <ColorDescriptor text="Secondary" color={secondary} />
      </div>
      <button className={`btn-sm button--gold ${styles.button}`} onClick={onClick}>
        Invert
      </button>
    </div>
  );
}

export default function ColorCard({ primary, secondary }) {
  const [theme, setTheme] = React.useState({ primary: primary, secondary: secondary });

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
          <button className="btn btn-sm mr-1" style={getStyle(true)}>
            Button
          </button>
        </div>
      </div>
      <CardFooter primary={theme.primary} secondary={theme.secondary} onClick={swapColors} />
    </article>
  );
}
