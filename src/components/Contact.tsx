export default function Contact(): JSX.Element {
  return (
    <div id="contact" className="container mt-24 mb-8">
      <h2 className="text-4xl">Get in touch</h2>
      <p className="my-4">
        Feel free to reach out if you have any questions, or if you would like to have a conversation.
      </p>
      <a
        href="mailto:julien.zapataduque@gmail.com"
        className="transition-colors border-b-2 pb-1 border-secondary hover:border-transparent focus-visible:border-transparent duration-200 font-semibold text-lg"
      >
        julien.zapataduque@gmail.com
      </a>
    </div>
  );
}
