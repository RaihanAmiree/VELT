import React from 'react';
import { motion } from 'framer-motion';
// Imports as requested
import { useTheme } from '../ThemeContext'; 
import { darkTheme, lightTheme } from '../theme'; 

export default function AboutExpertise() {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;

  const cubicEase = [0.22, 1, 0.36, 1]; // Classic elegant ease-out

  return (
    <section 
      style={{ 
        backgroundColor: theme.bgSecondary, 
        transition: 'background-color 0.5s ease',
        fontFamily: "'Barlow', sans-serif"
      }} 
      className="py-24 px-6 md:py-48 overflow-hidden"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Bebas+Neue&display=swap');`}
      </style>

      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER: Masked Animation */}
        <div className="mb-24">
          <div className="overflow-hidden mb-2">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: cubicEase }}
              className="block uppercase tracking-[0.6em] text-xs font-bold"
              style={{ color: theme.accent }}
            >
              The Support Infrastructure
            </motion.span>
          </div>
          
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: cubicEase }}
              className="text-7xl md:text-9xl leading-[0.85]"
              style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
            >
              ENGINEERED <br /> <span style={{ color: theme.accent }}>RELATIONS.</span>
            </motion.h2>
          </div>
        </div>

        {/* UTILITY GRID: Staggered Fade-in */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: theme.divider }}>
          
          <StatCard 
            theme={theme}
            title="System Tuning"
            desc="Advanced controller remapping and battery cell balancing to squeeze every watt of efficiency from your setup."
            index="01"
          />

          <StatCard 
            theme={theme}
            title="Rapid Logistics"
            desc="Global sourcing for rare performance components and high-output motor kits with priority lead times."
            index="02"
          />

          <StatCard 
            theme={theme}
            title="Field Access"
            desc="Exclusive connectivity to trail GPS overlays and silent-running events across the continent."
            index="03"
          />

        </div>

        {/* TECHNICAL DATA RIBBON: Replaces the title bar */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-l-2" style={{ borderColor: theme.accent }}>
          <MetricItem theme={theme} label="MAX TORQUE" value="250 NM" />
          <MetricItem theme={theme} label="CELL STABILITY" value="100%" />
          <MetricItem theme={theme} label="CHARGE RATE" value="10.5A" />
          <MetricItem theme={theme} label="PEAK OUTPUT" value="8.0 KW" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ theme, title, desc, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="p-12 md:p-16 relative group h-full"
      style={{ backgroundColor: theme.cardBg }}
    >
      <div 
        className="text-xs font-bold mb-12 flex items-center gap-3"
        style={{ color: theme.textSecondary, fontFamily: "'Bebas Neue', sans-serif" }}
      >
        <span style={{ color: theme.accent }}>[{index}]</span> SERVICE_PROTOCOL
      </div>

      <h3 
        className="text-4xl md:text-5xl mb-6 tracking-tight group-hover:translate-x-3 transition-transform duration-500"
        style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {title}
      </h3>
      
      <p className="text-lg leading-relaxed opacity-70" style={{ color: theme.textSecondary }}>
        {desc}
      </p>

      {/* Decorative Corner Element */}
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ 
          borderRight: `2px solid ${theme.accent}`, 
          borderBottom: `2px solid ${theme.accent}` 
        }}
      />
    </motion.div>
  );
}

function MetricItem({ theme, label, value }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="pl-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.3em] mb-1" style={{ color: theme.textSecondary }}>
        {label}
      </p>
      <p 
        className="text-4xl" 
        style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {value}
      </p>
    </motion.div>
  );
}