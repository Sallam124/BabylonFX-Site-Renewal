import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export default function FeatureCard({ feature }: { feature: { icon: ReactNode; title: string; description: string; gradient: string } }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'tween', duration: 0.01 }}
      className={
        "relative w-full h-full p-6 rounded-2xl shadow-md border border-white/10 " +
        "backdrop-blur-lg bg-white/5 text-white transition-all duration-300 cursor-pointer"
      }
    >
      {/* Glow */}
      <div
        className={
          "absolute inset-0 blur-2xl opacity-20 rounded-2xl z-0 bg-gradient-to-br " + feature.gradient
        }
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
        <p className="text-sm mt-2 text-black/80">{feature.description}</p>
      </div>
    </motion.div>
  );
} 