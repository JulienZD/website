import { useState, useEffect } from 'react';

const shareText = 'Share';
const copiedText = 'Copied!';

interface Props {
  url?: string;
}

export default function ShareButton({ url }: Props): JSX.Element {
  const [shareBtn, setShareBtn] = useState(shareText);

  const share = async (): Promise<void> => {
    const shareUrl = `${location.origin}${url || location.pathname}`;
    if (navigator.share) {
      await navigator.share({
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setShareBtn(copiedText);
    }
  };

  useEffect(() => {
    if (shareBtn === shareText) return;
    const timeout = setTimeout(() => setShareBtn(shareText), 2000);
    return (): void => clearTimeout(timeout);
  }, [shareBtn]);

  return (
    <button className="btn btn-outline" type="button" onClick={share}>
      {shareBtn}
    </button>
  );
}
