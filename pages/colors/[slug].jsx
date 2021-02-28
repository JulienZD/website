import { useState, useEffect } from 'react';
import Colors from './index';
import { useRouter } from 'next/router';

export default function slug() {
  const [colors, setColors] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setColors(tryImportColors(router.query.slug));
  }, [router.isReady]);
  return !colors ? <></> : <Colors initialColors={colors} />;
}

function tryImportColors(query) {
  if (!query) return;
  const splitQuery = query.split('-');
  if (!splitQuery.length) return;
  return splitQuery.filter((c) => c.match(/^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)).map((c) => `#${c}`);
}
