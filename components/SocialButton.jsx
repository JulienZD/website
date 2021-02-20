export default function SocialButton({ href, icon, ariaLabel }) {
  return (
    <a href={href} className="button--gold">
      <i className={`bi bi-${icon}`} aria-label={ariaLabel}></i>
    </a>
  );
}
