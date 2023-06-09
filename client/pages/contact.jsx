import Navbar from '@/components/Navbar';
import styles from '../styles/Contact.module.css';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useRef } from 'react';

function Contact() {
  const siteKey = process.env.CAPTCHA_SITE_KEY;
  const [reCaptchaValue, setReCaptchaValue] = useState('');
  const captchaRef = useRef();
  const [contactError, setContactError] = useState(false);

  const handleCaptcha = (value) => {
    setReCaptchaValue(value);
    setContactError(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reCaptchaValue === '') {
      alert('Please verify that you are a human!');
      captchaRef.current.reset();
      return;
    }
    const data = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      phone: e.target[2].value,
      email: e.target[3].value,
      issue: e.target[4].value,
      message: e.target[5].value,
      captcha: reCaptchaValue
    };
    fetch(`${process.env.SERVER_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'success') {
          alert('Your message has been sent successfully!');
          captchaRef.current.reset();
        } else {
          alert('Something went wrong!');
          captchaRef.current.reset();
        }
      })
      .catch(err => {
        console.log(err);
        alert('Something went wrong!');
        captchaRef.current.reset();
      });
  }

  return (
    <div className={styles.contact}>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.contact_form}>
          <div className={styles.left}>
            <h1 className={styles.heading}>Contact Us</h1>
            <div className={styles.form_body}>
              {contactError && <p className={styles.error}>Please fill all the fields!</p>}
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputs}>
                  <label htmlFor="name" className={styles.label}>First name :</label>
                  <input type='text' id='name' className={styles.input} onChange={() => setContactError(false)} />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="name" className={styles.label}>Last name :</label>
                  <input type='text' id='name' className={styles.input} onChange={() => setContactError(false)} />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="phone" className={styles.label}>Phone :</label>
                  <input type='number' id='phone' className={styles.input} onChange={() => setContactError(false)} />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="email" className={styles.label}>Email :</label>
                  <input type='email' id='email' className={styles.input} onChange={() => setContactError(false)} />
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="issue" className={styles.label}>Issue :</label>
                  <select className={styles.options} name="issue" onChange={() => setContactError(false)}>
                    <option className={styles.option} value="Service">Service Related</option>
                    <option className={styles.option} value="Payment">Payment Related</option>
                    <option className={styles.option} value="Client">Client Related</option>
                    <option className={styles.option} value="Freelancer">Freelancer Related</option>
                    <option className={styles.option} value="Platform">Platform Related</option>
                  </select>
                </div>
                <div className={styles.inputs}>
                  <label htmlFor="message" className={styles.label}>Message :</label>
                  <textarea className={styles.textarea} name="message" id="message" cols="30" rows="10"
                    onChange={() => setContactError(false)}
                  ></textarea>
                </div>
                <ReCAPTCHA
                  sitekey={siteKey}
                  onChange={handleCaptcha}
                  ref={captchaRef}
                  className={styles.captcha}
                />
                <button className={styles.btn} type='submit'>Submit</button>
              </form>
            </div>
          </div>
          <div className={styles.right}>
            <Image src='/contactus.jpg' width='700' height='700' alt='contact_us' />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact;