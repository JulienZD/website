import Link from 'next/link';

interface Props {
  href: string;
  text: string;
  className?: string;
  title?: string;
}

function NavLink({ href, text, title, className }: Props): JSX.Element {
  return (
    <Link href={href}>
      <a className={`${className} link-animated-hover first:ml-0 last:mr-0 mx-2`} title={title ?? text}>
        {text}
      </a>
    </Link>
  );
}

export default function Header(): JSX.Element {
  return (
    <header className="container my-8 font-semibold text-lg sm:px-0 px-2">
      <nav className="flex justify-between">
        <NavLink href="/" text="JZD" title="Home" className="sm:text-2xl" />
        <div className="flex justify-around">
          <NavLink href="/about" text="About" />
          <NavLink href="/projects" text="Projects" />
          <NavLink href="/contact" text="Contact" />
        </div>
      </nav>
    </header>
  );
}
