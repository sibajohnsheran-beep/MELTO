
import { useState, type FormEvent } from "react";

import {
  ArrowRight,
  CheckCircle2,
  Heart,
  IceCreamCone,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Truck,
} from "lucide-react";

import "./Contact.css";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "General Enquiry",
  message: "",
};

function Contact() {
  const [form, setForm] =
    useState<ContactForm>(initialForm);

  const [submitted, setSubmitted] = useState(false);

  const updateField = (
    field: keyof ContactForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Frontend validation demo only.
    // No message is sent or saved.
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="melto-contact"
    >
      <div className="melto-contact-container">

        {/* SECTION HEADING */}

        <div className="melto-contact-heading">

          <span className="melto-contact-eyebrow">
            <Sparkles size={17} />
            WE LOVE HEARING FROM YOU
          </span>

          <h2>
            Let's Talk <span>Sweet!</span>
          </h2>

          <p>
            Have a question, a sweet idea or something
            to share? We're creating a happy place
            for every ice cream lover.
          </p>

        </div>

        {/* TWO COLUMN LAYOUT */}

        <div className="melto-contact-layout">

          {/* LEFT – CONTACT INFORMATION */}

          <div className="melto-contact-info">

            <div className="melto-contact-visual">

              <div className="melto-contact-glow" />

              <span className="melto-contact-star star-one">
                ✦
              </span>

              <span className="melto-contact-star star-two">
                ✧
              </span>

              <span className="melto-contact-star star-three">
                ♥
              </span>

              <img
                src="/images/melto-mascot.png"
                alt="Happy MELTO ice cream mascot"
                className="melto-contact-mascot"
                loading="lazy"
              />

              <div className="melto-contact-happy-badge">
                <Heart
                  size={17}
                  fill="currentColor"
                />
                Made for Happy Moments
              </div>

            </div>

            <div className="melto-contact-info-heading">
              <h3>
                Every Sweet Conversation Matters!
              </h3>

              <p>
                Whether you're curious about our
                flavours or planning your next
                ice cream treat, MELTO is here
                to make the experience sweeter.
              </p>
            </div>

            {/* CONTACT INFO CARDS */}

            <div className="melto-contact-info-list">

              <div className="melto-contact-info-item">

                <div className="melto-contact-info-icon">
                  <Mail size={22} />
                </div>

                <div>
                  <h4>General Enquiries</h4>
                  <p>
                    Have a question about MELTO?
                    Use our enquiry form to prepare
                    your message.
                  </p>
                </div>

              </div>

              <div className="melto-contact-info-item">

                <div className="melto-contact-info-icon">
                  <Truck size={22} />
                </div>

                <div>
                  <h4>Delivery & Shop Pickup</h4>
                  <p>
                    Choose your preferred way to
                    enjoy MELTO during checkout.
                  </p>
                </div>

              </div>

              <div className="melto-contact-info-item">

                <div className="melto-contact-info-icon">
                  <MapPin size={22} />
                </div>

                <div>
                  <h4>Visit MELTO</h4>
                  <p>
                    Shop address and opening hours
                    will be displayed here once
                    confirmed.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT – CONTACT FORM */}

          <div className="melto-contact-form-card">

            <div className="melto-contact-form-header">

              <div className="melto-contact-form-icon">
                <IceCreamCone size={27} />
              </div>

              <div>
                <h3>Send Us a Sweet Note!</h3>
                <p>
                  We'd love to hear what you have
                  to say.
                </p>
              </div>

            </div>

            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="melto-contact-field">

                <label htmlFor="melto-contact-name">
                  Your Name
                  <span> *</span>
                </label>

                <input
                  id="melto-contact-name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  maxLength={80}
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value
                    )
                  }
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="melto-contact-field">

                <label htmlFor="melto-contact-email">
                  Email Address
                  <span> *</span>
                </label>

                <input
                  id="melto-contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  maxLength={180}
                  value={form.email}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value
                    )
                  }
                  required
                />

              </div>

              {/* SUBJECT */}

              <div className="melto-contact-field">

                <label htmlFor="melto-contact-subject">
                  What's It About?
                </label>

                <select
                  id="melto-contact-subject"
                  value={form.subject}
                  onChange={(event) =>
                    updateField(
                      "subject",
                      event.target.value
                    )
                  }
                >
                  <option value="General Enquiry">
                    General Enquiry
                  </option>

                  <option value="Ice Cream Flavours">
                    Ice Cream Flavours
                  </option>

                  <option value="Delivery and Pickup">
                    Delivery & Pickup
                  </option>

                  <option value="Order Enquiry">
                    Order Enquiry
                  </option>

                  <option value="Feedback">
                    Feedback & Suggestions
                  </option>
                </select>

              </div>

              {/* MESSAGE */}

              <div className="melto-contact-field">

                <label htmlFor="melto-contact-message">
                  Your Sweet Message
                  <span> *</span>
                </label>

                <textarea
                  id="melto-contact-message"
                  rows={5}
                  maxLength={1200}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={(event) =>
                    updateField(
                      "message",
                      event.target.value
                    )
                  }
                  required
                />

                <small>
                  {form.message.length}/1200 characters
                </small>

              </div>

              {/* SUBMIT DEMO */}

              <button
                type="submit"
                className="melto-contact-submit"
              >
                <Send size={18} />
                Check Message (Demo)
                <ArrowRight size={18} />
              </button>

              {submitted && (
                <div
                  className="melto-contact-success"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 size={21} />

                  <p>
                    Your form is valid! This is a
                    frontend demo, so your message
                    has not been sent or saved.
                  </p>
                </div>
              )}

              <p className="melto-contact-form-note">
                Contact form delivery will be enabled
                when the backend is connected.
              </p>

            </form>

          </div>

        </div>

        {/* BOTTOM MESSAGE */}

        <div className="melto-contact-bottom">

          <Sparkles size={20} />

          <span>
            Happiness is sweeter when shared!
          </span>

          <a href="#signature-picks">
            Discover Our Flavours
            <ArrowRight size={17} />
          </a>

        </div>

      </div>
    </section>
  );
}

export default Contact;
