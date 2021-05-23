import { useState, useEffect } from 'react';
import { ColorCombination } from 'types';

interface CardFooterProps {
  colorCombination: ColorCombination;
  onClick: () => void;
}

function OutlinedButton({ color }: { color: string }): JSX.Element {
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

function Circle({ color }: { color: string }): JSX.Element {
  return <div className="inline-block h-4 w-4 rounded-full ml-1" style={{ backgroundColor: color }} />;
}

function ColorDescriptor({ text, color }: { text: string; color: string }): JSX.Element {
  return (
    <small className="flex flex-nowrap items-center">
      <span className="whitespace-nowrap">{`${text}: ${color.toLowerCase()}`}</span>
      <Circle color={color} />
    </small>
  );
}

function CardFooter({ colorCombination: { primary, secondary, contrast }, onClick }: CardFooterProps): JSX.Element {
  const [copyBtn, setCopyBtnText] = useState({ icon: 'clipboard', title: 'Copy to clipboard' });
  const toClipboard = async (): Promise<void> => {
    if (copyBtn.icon !== 'clipboard') return;
    await navigator.clipboard.writeText(`background-color: ${primary};\ncolor: ${secondary};`);
    setCopyBtnText({ icon: 'check2', title: 'Copied!' });
  };

  useEffect(() => {
    if (copyBtn.icon === 'clipboard') return;
    const timeout = setTimeout(() => setCopyBtnText({ icon: 'clipboard', title: 'Copy to clipboard' }), 2000);
    return (): void => clearTimeout(timeout);
  }, [copyBtn]);

  return (
    <div className="p-2 flex justify-between text-gray-300">
      <div className="flex flex-col">
        <ColorDescriptor text="Primary" color={primary} />
        <ColorDescriptor text="Secondary" color={secondary} />
        <small>Contrast Ratio: {contrast}</small>
      </div>
      <div className="flex justify-end text-secondary">
        <button title={copyBtn.title} className="btn-link btn btn-sm" onClick={toClipboard} aria-label={copyBtn.title}>
          <i className={`bi bi-${copyBtn.icon}`} />
        </button>
        <button className="btn btn-sm btn-link" onClick={onClick} aria-label="Invert colors">
          <i className="bi bi-circle-half" />
        </button>
      </div>
    </div>
  );
}

export default function ColorCard(props: ColorCombination): JSX.Element {
  const [theme, setTheme] = useState({ primary: props.primary, secondary: props.secondary });
  const { primary, secondary } = theme;

  const swapColors = (): void => setTheme({ primary: secondary, secondary: primary });

  return (
    <article className="m-1">
      <div className="p-2 rounded-md" style={{ backgroundColor: primary, color: secondary }}>
        <hgroup>
          <p className="text-4xl">Heading 1</p>
          <p className="text-3xl">Heading 2</p>
          <p className="text-2xl">Heading 3</p>
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
