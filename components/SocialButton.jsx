export default function SocialButton({ href, icon, ariaLabel }) {
  return (
    <a href={href} className="btn btn-outline inline-flex">
      <i className={`bi bi-${icon}`} aria-label={ariaLabel}></i>
    </a>
  );
}
