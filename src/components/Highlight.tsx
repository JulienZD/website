import { ReactNode } from 'react';

export default function Highlight({ children }: { children: ReactNode }): JSX.Element {
  return <span className="text-secondary">{children}</span>;
}
