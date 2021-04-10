interface Props {
  href: string;
  icon: string;
  ariaLabel: string;
}

export default function SocialButton({ href, icon, ariaLabel }: Props): JSX.Element {
  return (
    <a href={href} className="btn btn-outline inline-flex">
      <i className={`bi bi-${icon}`} aria-label={ariaLabel}/>
    </a>
  );
}
