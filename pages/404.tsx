import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center text-center h-screen">
      <div>
        <h1>This page does not exist</h1>
        <Link href="/">
          <a className="link link-animated-hover">Back to the homepage</a>
        </Link>
      </div>
    </div>
  );
}
