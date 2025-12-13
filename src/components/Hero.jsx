// src/components/Hero.jsx
import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl text-amber-500 md:text-6xl font-bold leading-tight">Frontend Developer — React & UI</h1>
          <p className="mt-6 max-w-xl text-lg">Short intro paragraph that we’ll style to match the reference site.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-lg"
        />
      </div>
    </section>
  )
}
