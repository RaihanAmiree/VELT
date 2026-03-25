import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { darkTheme, lightTheme } from "../theme";

// Socials
const socials = [
  { label: "YouTube", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>) },
  { label: "Instagram", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.5-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.5 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2 16.5 2 16.2 2 12s0-3.5.1-4.8c.2-3.3 1.7-4.8 5-5C8.5 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 7 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.8-2.6 7-7 .1-1.3.1-1.7.1-5s0-3.7-.1-5C23.7 2.7 21.3.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" /></svg>) },
  { label: "Facebook", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" /></svg>) },
  { label: "LinkedIn", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.58 0 4.24 2.36 4.24 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>) },
  { label: "TikTok", href: "#", icon: (<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19.59 6.69a4.83 4.83 0 0 1-4.83-4.83V0h-3.37v16.57a2.89 2.89 0 1 1-2.06-2.77V10.3a6.27 6.27 0 1 0 5.43 6.2V8.47a8.16 8.16 0 0 0 4.83 1.57V6.68h-.0z" /></svg>) },
];

const ContactSection = () => {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: `1px solid ${theme.cardBorder}`,
    background: theme.bgSecondary,
    color: theme.textPrimary,
    outline: "none",
  };

  return (
    <>
      <div
        className="contact-container"
        style={{ background: theme.bgPrimary }}
      >
        {/* LEFT */}
        <div
          className="contact-card"
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
          }}
        >
          <h3 style={{ color: theme.textPrimary }}>Call To Us</h3>
          <p style={{ color: theme.textSecondary }}>
            We are available 24/7, 7 days a week.
          </p>
          <p style={{ fontWeight: "bold", color: theme.textPrimary }}>
            Phone: +880 1886-715026
          </p>

          <hr style={{ margin: "20px 0", borderColor: theme.divider }} />

          <h3 style={{ color: theme.textPrimary }}>Write To Us</h3>
          <p style={{ color: theme.textSecondary }}>
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p style={{ color: theme.textPrimary }}>
            Email: veltdrt@gmail.com
          </p>

          <hr style={{ margin: "20px 0", borderColor: theme.divider }} />

          <p style={{ color: theme.textSecondary }}>Follow Us</p>

          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-btn"
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                style={{
                  border: `1px solid ${
                    dark ? "rgba(194,197,204,0.15)" : theme.cardBorder
                  }`,
                  background: dark
                    ? "rgba(194,197,204,0.04)"
                    : theme.bgSecondary,
                  color: dark
                    ? "rgba(194,197,204,0.55)"
                    : theme.textPrimary,
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="contact-card"
          style={{
            background: theme.cardBg,
            border: `1px solid ${theme.cardBorder}`,
          }}
        >
          <form className="contact-form">
            <div className="form-row">
              <input
                style={inputStyle}
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                style={inputStyle}
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                style={inputStyle}
                name="phone"
                placeholder="Your Phone *"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <textarea
              style={inputStyle}
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
            />

            <div className="form-actions">
              <button
                style={{
                  padding: "12px 24px",
                  background: theme.accent,
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
          padding: 40px;
        }

        .contact-card {
          border-radius: 16px;
          padding: 25px;
        }

        .footer-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 8px;
          text-decoration: none;
        }

        .contact-form {
          display: grid;
          gap: 15px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .form-actions {
          text-align: right;
        }

        /* Focus effect WITHOUT breaking theme borders */
        input:focus,
        textarea:focus {
          box-shadow: 0 0 0 2px rgba(0,0,0,0.08);
        }

        /* Tablet */
        @media (max-width: 992px) {
          .contact-container {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            text-align: center;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .contact-container {
            padding: 20px;
          }

          .contact-card {
            padding: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default ContactSection;