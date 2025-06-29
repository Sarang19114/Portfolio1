import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_m29enzn',
        'template_5a4yild',
        {
          from_name: form.name,
          to_name: 'Sarang Rastogi',
          from_email: form.email,
          to_email: 'rastogi.sarang19@gmail.com',
          message: form.message,
        },
        '67XVJbc0n6eJZP-Lr',
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message. Please try again later.",
            type: 'danger',
          });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col xl:flex-row gap-20">

        {/* Contact Form Section */}
        <div className="contact-container">
          <h3 className="head-text">Let&apos;s talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you&apos;re looking to build a new website, improve your existing platform, or bring a unique project to
            life, I&apos;m here to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>

        {/* Resume & Image Section */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10 md:gap-20">

        <div className="w-full max-w-lg h-[500px] mt-4 border-2 border-white rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="/assets//Sarang-Rastogi-Resume.pdf"
              title="Resume Viewer"
              className="w-full h-full"
            />
          </div>
          
          <a
            href="/assets//Sarang-Rastogi-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-lg bg-black-200 text-white-800 text-center py-4 rounded-xl text-lg font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-xl shadow-black-500"
          >
            VIEW MY RESUME
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
