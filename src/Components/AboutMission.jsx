import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../ThemeContext'; 
import { darkTheme, lightTheme } from '../theme'; 

export default function AboutFeatures() {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;
  const { scrollYProgress } = useScroll();
  
  // Parallax for technical background
  const y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const elegantEase = [0.16, 1, 0.3, 1];

  return (
    <section 
      style={{ 
        backgroundColor: theme.bgPrimary, 
        transition: 'background-color 0.5s ease',
        fontFamily: "'Barlow', sans-serif",
        position: 'relative'
      }} 
      className="py-24 px-6 md:py-48 overflow-hidden"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Bebas+Neue&display=swap');`}
      </style>

      {/* BACKGROUND DECORATION */}
      <motion.div 
        style={{ 
          y,
          fontFamily: "'Bebas Neue', sans-serif",
          color: theme.accent,
          opacity: 0.04,
          fontSize: '22vw',
          lineHeight: 1,
          position: 'absolute',
          top: 0,
          right: '-2%',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0
        }}
      >
        SUR-RON // PERFORMANCE
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT: Solid Branding & Narrative */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: elegantEase }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[3px] w-14" style={{ backgroundColor: theme.accent }} />
                <span className="uppercase tracking-[0.5em] text-xs font-bold" style={{ color: theme.accent }}>
                  Engineering Excellence
                </span>
              </div>

              <h2 
                className="text-7xl md:text-9xl mb-10 leading-[0.8]"
                style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
              >
                UNMATCHED <br /> 
                <span style={{ color: theme.accent }}>PRECISION</span>
              </h2>

              <p className="text-xl md:text-2xl leading-relaxed mb-12 max-w-lg" style={{ color: theme.textSecondary }}>
                We bridge the gap between mountain biking and motocross. Our focus on 
                <span style={{ color: theme.textPrimary, fontWeight: 600 }}> high-voltage innovation</span> 
                means zero maintenance and instant results on the dirt.
              </p>

              {/* Technical Spec Badge */}
              <div 
                className="inline-flex flex-col p-6 border-l-4" 
                style={{ backgroundColor: theme.bgSecondary, borderColor: theme.accent }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em] mb-2" style={{ color: theme.textPrimary }}>Quality Control</span>
                <span className="text-sm opacity-70" style={{ color: theme.textSecondary }}>Certified 60V-72V System Calibration</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Detailed Content Stack */}
          <div className="lg:w-1/2 flex flex-col gap-8">
            <ContentBlock 
              theme={theme}
              title="Curation Standards"
              desc="Every unit is hand-selected. We only stock bikes with a verified power-to-weight ratio that exceeds industry benchmarks."
              index="01"
            />
            <ContentBlock 
              theme={theme}
              title="Thermal Control"
              desc="Our builds feature advanced air-cooled heat sinks and high-density cells, ensuring your peak torque remains consistent."
              index="02"
            />
            <ContentBlock 
              theme={theme}
              title="Silent Dynamics"
              desc="Experience the freedom of off-road exploration without the acoustic signature. Silent speed is the new standard."
              index="03"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function ContentBlock({ theme, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        backgroundColor: theme.cardBg, 
        border: `1px solid ${theme.cardBorder}`,
      }}
      className="p-10 md:p-14 relative group overflow-hidden"
    >
      {/* Visual background element for weight */}
      <div 
        className="absolute -bottom-4 -right-4 text-9xl font-bold opacity-[0.03] select-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif", color: theme.textPrimary }}
      >
        {index}
      </div>

      <h3 
        className="text-4xl md:text-5xl mb-6 tracking-wide"
        style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {title}
      </h3>
      
      <p 
        className="text-lg md:text-xl leading-relaxed relative z-10" 
        style={{ color: theme.textSecondary }}
      >
        {desc}
      </p>

      {/* Decorative accent that appears on hover */}
      <div 
        className="absolute top-0 left-0 h-full w-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: theme.accent }}
      />
    </motion.div>
  );
}