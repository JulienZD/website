import Link from 'next/link';

export default function NotFound() {
  return (
    <div id="notFound">
      <h1>This page does not exist</h1>
      <Link href="/">
        <a className="j-link">Back to the homepage</a>
      </Link>
      <style jsx global>{`
        body {
          margin: 0;
        }
        #notFound {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
