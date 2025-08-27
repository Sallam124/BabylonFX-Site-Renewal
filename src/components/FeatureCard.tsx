import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export default function FeatureCard({ feature }: { feature: { icon: ReactNode; title: string; description: string; gradient: string } }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'tween', duration: 0.01 }}
      className={
        "relative w-full h-full p-6 rounded-3xl shadow-lg border border-white/10 " +
        "backdrop-blur-xl bg-white/5 hover:bg-white/8 transition-all duration-500 cursor-pointer " +
        "hover:shadow-2xl hover:scale-105"
      }
    >
      {/* Very Subtle Glow */}
      <div
        className={
          "absolute inset-0 blur-3xl opacity-5 rounded-3xl z-0 bg-gradient-to-br " + feature.gradient
        }
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
        <p className="text-sm mt-2 text-gray-600">{feature.description}</p>
      </div>
    </motion.div>
  );
} 