import { useState, useEffect } from 'react';
import styles from './ColorCard.module.css';

interface ColorCombination {
  primary: string;
  secondary: string;
  contrast: number;
}

interface CardFooterProps {
  colorCombination: ColorCombination;
  onClick: () => void;
}

function OutlinedButton({ color }: { color: string }) {
  return (
    <div
      className="btn btn-sm select-none cursor-pointer first:ml-0 mr-1 focus:ring-0 focus:ring-transparent"
      style={{ color: color, border: `1px solid ${color}` }}
      tabIndex={-1}
    >
      Button
    </div>
  );
}

function Circle({ color }: { color: string }) {
  return <div className="inline-block h-4 w-4 rounded-full ml-1" style={{ backgroundColor: color }} />;
}

function ColorDescriptor({ text, color }: { text: string; color: string }) {
  return (
    <small className="flex flex-nowrap items-center">
      <span className="whitespace-nowrap">{`${text}: ${color.toLowerCase()}`}</span>
      <Circle color={color} />
    </small>
  );
}

function CardFooter({ colorCombination: { primary, secondary, contrast }, onClick }: CardFooterProps) {
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
    <div className="p-2 flex justify-between text-gray-300">
      <div className="flex flex-col">
        <ColorDescriptor text="Primary" color={primary} />
        <ColorDescriptor text="Secondary" color={secondary} />
        <small>Contrast Ratio: {contrast}</small>
      </div>
      <div className="flex justify-end" style={{ color: 'var(--main-text)' }}>
        <button title={copyBtn.title} className="btn-link btn btn-sm" onClick={toClipboard} aria-label={copyBtn.title}>
          <i className={`bi bi-${copyBtn.icon}`}></i>
        </button>
        <button className="btn btn-sm btn-link" onClick={onClick} aria-label="Invert colors">
          <i className="bi bi-circle-half"></i>
        </button>
      </div>
    </div>
  );
}

export default function ColorCard(props: ColorCombination) {
  const [theme, setTheme] = useState({ primary: props.primary, secondary: props.secondary });
  const { primary, secondary } = theme;

  const swapColors = () => setTheme({ primary: secondary, secondary: primary });

  return (
    <article className="m-1">
      <div className="p-2 rounded-md" style={{ backgroundColor: primary, color: secondary }}>
        <hgroup>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
        </hgroup>
        <p>The quick brown fox jumps over the lazy dog</p>
        <div className="flex mt-1">
          <OutlinedButton color={secondary} />
          <div
            className="btn btn-sm mr-1 select-none cursor-pointer"
            style={{ backgroundColor: secondary, color: primary }}
            tabIndex={-1}
          >
            Button
          </div>
        </div>
      </div>
      <CardFooter colorCombination={props} onClick={swapColors} />
    </article>
  );
}