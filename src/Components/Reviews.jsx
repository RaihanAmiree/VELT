import React, { useLayoutEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";
import { darkTheme, lightTheme } from "../theme";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin (Standard GSAP practice)
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/150?u=1",
    text: "The attention to detail is staggering. Usually, bike rentals feel like a transaction, but this felt like an experience.",
    rating: 5,
  },
  {
    name: "Michael Lee",
    role: "Adventure Enthusiast",
    avatar: "https://i.pravatar.cc/150?u=2",
    text: "I took a mountain bike out for a weekend in the hills. The suspension was perfectly tuned. Five stars!",
    rating: 5,
  },
  {
    name: "Ayesha Rahman",
    role: "City Explorer",
    avatar: "https://i.pravatar.cc/150?u=3",
    text: "Finding a reliable service in the city is hard. This was seamless from booking to return. Great support team.",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Heading Animation
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".testimonial-header",
          start: "top 80%",
        }
      });

      // 2. Staggered Card Animation
      gsap.from(".testimonial-card", {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.2,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: ".testimonial-grid",
          start: "top 85%",
        }
      });
    }, component);

    return () => ctx.revert(); // Cleanup to prevent "hanging" or memory leaks
  }, []);

  return (
    <section ref={component} style={{ background: theme.bgPrimary, padding: '100px 5vw', overflow: 'hidden' }}>
      <style>{`
        .testimonial-header { margin-bottom: 60px; text-align: center; }
        .testimonial-eyebrow { color: ${theme.accent}; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; }
        .testimonial-heading { font-family: 'Bebas Neue', sans-serif; font-size: 4rem; color: ${theme.textPrimary}; margin: 0; }
        
        .testimonial-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
          gap: 30px; 
          max-width: 1200px; 
          margin: 0 auto; 
        }

        .testimonial-card {
          background: ${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
          border: 1px solid ${theme.cardBorder};
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(10px);
          transition: border-color 0.3s;
        }

        .testimonial-card:hover { border-color: ${theme.accent}; }

        .avatar { width: 60px; height: 60px; border-radius: 50%; border: 2px solid ${theme.accent}; margin-right: 15px; }
        .user-info { display: flex; align-items: center; margin-top: 30px; }
        .quote-text { font-size: 1.1rem; color: ${theme.textSecondary}; line-height: 1.6; font-style: italic; }
      `}</style>

      <div className="testimonial-header">
        <span className="testimonial-eyebrow">Testimonials</span>
        <h2 className="testimonial-heading reveal-text">What Our Riders Say</h2>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div style={{color: theme.accent, fontSize: '1.2rem', marginBottom: '15px'}}>{"★".repeat(t.rating)}</div>
            <p className="quote-text">"{t.text}"</p>
            <div className="user-info">
              <img src={t.avatar} className="avatar" alt={t.name} />
              <div>
                <strong style={{color: theme.textPrimary, display: 'block'}}>{t.name}</strong>
                <span style={{color: theme.accent, fontSize: '0.8rem'}}>{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}