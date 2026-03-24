import React from "react";
import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";
import { darkTheme, lightTheme } from "../theme";

const FeatureDetail = ({ features }) => {
  const { dark } = useTheme();
  const t = dark ? darkTheme : lightTheme;

  return (
    <section 
      style={{ backgroundColor: t.bgPrimary, color: t.textPrimary }}
      className="w-full py-24 px-6 transition-colors duration-700 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-40 md:gap-60">
        {features.map((feature, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-32 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Media Section */}
              <div className="w-full md:w-1/2 relative group">
                {/* Subtle Glow Backdrop */}
                <div 
                  className="absolute -inset-10 blur-[120px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 rounded-full"
                  style={{ backgroundColor: t.accentCopper || t.accent }}
                />
                
                <div 
                  className="relative overflow-hidden rounded-[2rem] shadow-2xl border transition-all duration-700"
                  style={{ 
                    backgroundColor: t.cardBg, 
                    borderColor: t.cardBorder 
                  }}
                >
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.9 }}
                >
                  <span 
                    style={{ color: t.accent }}
                    className="text-[10px] tracking-[0.6em] uppercase font-bold mb-6 block opacity-90"
                  >
                    {feature.tag}
                  </span>

                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-8">
                    {feature.title}
                  </h2>

                  <p 
                    style={{ color: t.textSecondary }}
                    className="text-lg md:text-xl leading-relaxed max-w-md font-light italic opacity-80"
                  >
                    {feature.description}
                  </p>
                  
                  {/* Subtle divider instead of a button */}
                  <div 
                    className="h-[1px] w-12 mt-10 opacity-30" 
                    style={{ backgroundColor: t.accent }}
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureDetail;