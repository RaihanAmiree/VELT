import React from 'react';
import { motion } from 'framer-motion';
// Using the requested relative imports
import { useTheme } from '../ThemeContext'; 
import { darkTheme, lightTheme } from '../theme'; 

export default function AboutCommunity() {
  const { dark } = useTheme();
  const theme = dark ? darkTheme : lightTheme;

  const elegantEase = [0.16, 1, 0.3, 1]; // Power ease-out

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: elegantEase } 
    },
  };

  return (
    <section 
      style={{ 
        backgroundColor: theme.bgPrimary, // Switching back to Primary for contrast
        transition: 'background-color 0.5s ease',
        fontFamily: "'Barlow', sans-serif"
      }} 
      className="py-24 px-6 md:py-40 overflow-hidden relative"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Bebas+Neue&display=swap');`}
      </style>

      {/* Decorative Text Watermark (Subtle) */}
      <div 
        className="absolute top-10 left-10 text-[20vw] font-bold opacity-[0.02] select-none pointer-events-none"
        style={{ color: theme.textSecondary, fontFamily: "'Bebas Neue', sans-serif", lineHeight: 0.8 }}
      >
        SILENT RIDE
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block: Right-Aligned for asymmetry */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: elegantEase }}
          className="flex flex-col items-end text-right mb-24 max-w-3xl ml-auto"
        >
          <span 
            className="uppercase tracking-[0.5em] text-xs font-bold mb-4 block"
            style={{ color: theme.accent }}
          >
            THE MOVEMENT
          </span>
          <h2 
            className="text-6xl md:text-8xl leading-[0.85] mb-8"
            style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
          >
            A Culture <br /> Defying <span style={{ color: theme.accent }}>Decibels.</span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-xl" style={{ color: theme.textSecondary }}>
            We are pioneering a new type of exploration. One that values instant torque and 
            deep backcountry access without the acoustic signature of combustion. 
            Join a community that rides respectably.
          </p>
        </motion.div>

        {/* --- IMAGE & TEXT GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          
          {/* Tile 1: Small Action Image (Compatible size) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-4 aspect-[5/4] rounded-2xl overflow-hidden border"
            style={{ borderColor: theme.cardBorder }}
          >
            <img 
              src="https://images.unsplash.com/photo-1614165939023-455b766bd710?q=80&w=1200&auto=format&fit=crop" 
              alt="Electric bike rider on mountain trail"
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 ease-out"
            />
          </motion.div>

          {/* Tile 2: Text Block (The Advocacy) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-8 p-12 rounded-2xl flex flex-col justify-center"
            style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
          >
            <h3 
              className="text-4xl mb-6"
              style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TRAIL ADVOCACY & ACCESS
            </h3>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: theme.textSecondary }}>
              Silent operation opens doors. We work closely with local land management 
              to demonstrate the low impact of electric exploration, securing future 
              access for responsible riders.
            </p>
          </motion.div>

          {/* Tile 3: Text Block (The Group Rides) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-7 p-12 rounded-2xl flex flex-col justify-center"
            style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
          >
            <h3 
              className="text-4xl mb-6"
              style={{ color: theme.textPrimary, fontFamily: "'Bebas Neue', sans-serif" }}
            >
              "SILENT MOTO" COLLECTIVE
            </h3>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: theme.textSecondary }}>
              Connect with fellow enthusiasts. From technical workshops to organized 
              night rides, we facilitate the events that define the modern electric 
              lifestyle.
            </p>
          </motion.div>

          {/* Tile 4: Small Lifestyle Image (Compatible size) */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border"
            style={{ borderColor: theme.cardBorder }}
          >
            <img 
              src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop" 
              alt="Close up of electric bike drivetrain"
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-all duration-700 ease-out"
            />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}