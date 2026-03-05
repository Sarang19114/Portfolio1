'use client';

import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (!showSplash) return;
    const t = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(t);
  }, [showSplash]);

  const handleCoffeeClick = (e) => {
    e.preventDefault();
    setShowSplash(true);
    setTimeout(() => window.open('https://buymeacoffee.com/sarang19', '_blank'), 1500);
  };

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

      <div className="relative min-h-screen flex items-stretch justify-center flex-col xl:flex-row gap-10">

        {/* Contact Form Section */}
        <div className="flex-1 contact-container bg-black-200/50 backdrop-blur-sm border border-black-300 rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col">
          <h3 className="head-text">Let&apos;s talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you&apos;re looking to build a new website, improve your existing platform, or bring a unique project to
            life, I&apos;m here to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7 flex-1">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Virat Kohli"
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
                placeholder="viratkohli@gmail.com"
              />
            </label>

            <label className="space-y-3 flex-1 flex flex-col">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="field-input flex-1 resize-none"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn active:scale-95 transition-all" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <Image src="/assets/arrow-up.png" alt="arrow-up" width={20} height={20} className="field-btn_arrow" />
            </button>
          </form>
        </div>

        {/* Resume & Booking Section */}
        <div className="flex-1 flex flex-col items-center gap-6">

          <div className="w-full h-[540px] mt-4 border-2 border-white/20 rounded-xl overflow-hidden shadow-2xl group relative z-20">
            <iframe
              src="https://sarang19114.github.io/WebResume"
              title="Resume Viewer"
              style={{ width: 'calc(100% + 20px)', height: 'calc(100% + 20px)', border: 'none' }}
              className="relative z-20"
            />
          </div>

          <a
            href="https://sarang19114.github.io/WebResume"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-2xl bg-black-200 text-white-800 text-center py-4 rounded-xl text-lg font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-xl shadow-black-500 border border-white/10"
          >
            VIEW MY RESUME
          </a>

          <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-5">
            <a
              href="https://calendly.com/rastogi-sarang19"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              Schedule Meeting
            </a>
            {showSplash && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
                onClick={() => setShowSplash(false)}
              >
                <div className="absolute inset-0 animate-chai-flash" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(circle at center, rgba(255,210,60,0.95) 0%, rgba(220,70,0,0.65) 38%, rgba(0,0,0,0.9) 68%)' }}
                />
                <div className="relative z-10 animate-chai-pop">
                  <div className="absolute inset-[-80px] rounded-full bg-yellow-300 blur-[120px] opacity-100" />
                  <div className="absolute inset-[-40px] rounded-full bg-orange-200 blur-[70px] opacity-80" />
                  <div className="absolute inset-[-10px] rounded-full bg-white blur-[30px] opacity-40" />
                  <Image
                    src="/assets/chaibaba.png"
                    alt="Chai Baba"
                    width={300}
                    height={300}
                    className="relative z-10 rounded-3xl shadow-[0_0_140px_rgba(255,210,0,1),0_0_60px_rgba(255,255,255,0.6)]"
                  />
                </div>
                <p className="absolute bottom-8 text-white/40 text-xs tracking-[0.25em] uppercase">click anywhere to close</p>
              </div>
            )}
            <a
              href="https://buymeacoffee.com/sarang19"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCoffeeClick}
              className="flex-1 flex items-center justify-center gap-3 bg-[#FFDD00] hover:bg-[#FFCC00] text-black py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-yellow-500/20"
            >
              <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="BMC" className="w-5 h-5" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
