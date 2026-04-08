import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Added this
// Using your requested relative imports
import { useTheme } from '../ThemeContext'; 
import { darkTheme, lightTheme } from '../theme'; 

export default function AboutFooterCTA() {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;

  const elegantEase = [0.16, 1, 0.3, 1];

  return (
    <section 
      style={{ 
        backgroundColor: theme.bgPrimary, 
        transition: 'background-color 0.5s ease',
        fontFamily: "'Barlow', sans-serif"
      }} 
      className="py-24 px-6 md:py-48 overflow-hidden"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Bebas+Neue&display=swap');`}
      </style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: The Image Tile */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: elegantEase }}
            className="lg:col-span-5 relative group"
          >
            <div 
              className="aspect-[4/5] rounded-3xl overflow-hidden border relative z-10"
              style={{ borderColor: theme.cardBorder }}
            >
              <img 
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop" 
                alt="Technical detail"
                className="w-full h-full object-cover brightness-50 group-hover:brightness-90 transition-all duration-1000"
              />
            </div>
            <div 
              className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 z-0 opacity-20"
              style={{ borderColor: theme.accent }}
            />
          </motion.div>

          {/* RIGHT: The Closing Narrative & Link */}
          <div className="lg:col-span-7 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: elegantEase }}
            >
              <span 
                className="uppercase tracking-[0.6em] text-xs font-bold mb-6 block"
                style={{ color: theme.accent }}
              >
                The Final Frontier
              </span>
              
              <h2 
                className="text-7xl md:text-9xl leading-[0.8] mb-10"
                style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Let's <br /> <span style={{ color: theme.accent }}>Synchronize.</span>
              </h2>

              <p 
                className="text-xl md:text-2xl leading-relaxed mb-12 opacity-80"
                style={{ color: theme.textSecondary }}
              >
                The electric revolution isn't just about the machine; it's about the partnership. 
                Our specialized support is ready to ensure your system stays optimized.
              </p>

              {/* CORRECTED: Using Link instead of href */}
              <Link to="/support" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45"
                    style={{ backgroundColor: theme.accent }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span 
                      className="text-2xl font-bold uppercase tracking-widest"
                      style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      Enter Support Portal
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] opacity-50" style={{ color: theme.textSecondary }}>
                      Technical & Sales Assistance
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-px opacity-20"
        style={{ backgroundColor: theme.divider }}
      />
    </section>
  );
}