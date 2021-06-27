import { FormEvent, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';

export default function Contact(): JSX.Element {
  return (
    <div id="contact" className="container mt-24 mb-8">
      <h2 className="text-4xl">Get in touch</h2>
      <p className="my-4">
        Feel free to reach out if you have any questions, or if you would like to have a conversation.
      </p>

      <ContactForm />
    </div>
  );
}

type FormStatus = 'success' | 'error' | 'submitting' | undefined;

function ContactForm(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>();

  function postForm(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!formRef.current) {
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSdvTbm68VYgrCjJ6-jRIDUx8aLxt4Y5sgcEyYyw51jjuu_Adg/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(new FormData(formRef.current) as never).toString(),
    })
      .then(() => {
        setFormStatus('success');
        if (formRef.current) formRef.current.reset();
      })
      .catch(() => setFormStatus('error'));
  }

  return (
    <>
      <form onSubmit={(e): void => postForm(e)} ref={formRef} className="max-w-xl">
        <div className="flex flex-col my-4">
          <label htmlFor="name" className="text-secondary">
            Name
          </label>
          <input name="entry.2082540926" id="name" type="text" required />
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="email" className="text-secondary">
            E-mail
          </label>
          <input name="entry.1047030987" id="email" type="email" required />
        </div>

        <section className="flex flex-col my-4">
          <label htmlFor="message" className="text-secondary">
            Message
          </label>
          <textarea name="entry.149682232" id="message" required rows={5} />
        </section>

        <button className="btn btn-outline !ml-0 min-w-[7em] grid place-content-center" type="submit">
          {formStatus === 'submitting' ? <Loader type="Oval" color="#d49f1b" height={24} width={24} /> : 'Submit'}
        </button>
      </form>
      {formStatus === 'success' && <p className="text-secondary mt-4">Thanks, I'll be in touch soon!</p>}
      {formStatus === 'error' && (
        <p className="text-red-500 mt-4">Something went wrong while sending your message. Please try again later.</p>
      )}
    </>
  );
}
