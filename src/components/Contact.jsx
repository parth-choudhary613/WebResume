import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, Linkedin, Phone, Send, Terminal, Cpu, CheckCircle } from 'lucide-react';

// --- 3D Card Component ---
// Uses Framer Motion to create a 3D tilt effect based on mouse position
const TiltCard = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative group perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Main Contact Page ---
const ContactPage = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono p-4 md:p-8 flex items-center justify-center overflow-hidden relative">
      
      {/* Background Cyberpunk Grid/Glow Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-40 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600 rounded-full blur-[128px] opacity-40 animate-pulse" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 z-10">
        
        {/* Left Side: Contact Info & Title */}
        <div className="flex flex-col justify-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-2 text-pink-500">
              <Terminal size={20} />
              <span className="text-sm font-bold tracking-widest uppercase">System Ready</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              CONTACT_ME
            </h1>
            <p className="mt-4 text-slate-400 text-lg border-l-2 border-pink-500 pl-4">
              Initiate handshake protocol. Available for MERN stack collaborations and frontend deployments.
            </p>
          </motion.div>

          <div className="grid gap-6">
            <TiltCard className="w-full">
              <a href="https://www.linkedin.com/in/parth-choudhary-79b168290/" target="_blank" rel="noreferrer" className="block relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-xl hover:border-cyan-400/50 transition-colors duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-cyan-950 rounded-lg text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-shadow">
                    <Linkedin size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">LinkedIn</h3>
                    <p className="text-slate-400">Professional Network</p>
                  </div>
                  <Cpu className="ml-auto text-slate-700 group-hover:text-cyan-400 animate-pulse" />
                </div>
              </a>
            </TiltCard>

            <TiltCard className="w-full">
              <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new" className="block relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-xl hover:border-pink-400/50 transition-colors duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 bg-pink-950 rounded-lg text-pink-400 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-shadow">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">Gmail</h3>
                    <p className="text-slate-400">Direct Transmission</p>
                  </div>
                   <Cpu className="ml-auto text-slate-700 group-hover:text-cyan-400 animate-pulse" />
               
                </div>
              </a>
            </TiltCard>

            <TiltCard className="w-full">
          <a 
  href="https://wa.me/8894459562" 
  target="_blank" 
  rel="noreferrer" 
  className="block relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-xl hover:border-green-400/50 transition-colors duration-300 group"
>
  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="flex items-center gap-4 relative z-10">
    <div className="p-3 bg-emerald-950 rounded-lg text-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-shadow">
      <Phone size={28} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">WhatsApp</h3>
      <p className="text-slate-400">Encrypted Channel</p>
    </div>
     <Cpu className="ml-auto text-slate-700 group-hover:text-cyan-400 animate-pulse" />
               
  </div>
</a>
            </TiltCard>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Form Container with 3D Border Effect */}
          <div className="relative p-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-2xl">
            <div className="bg-black/90 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden">
              
              {/* Decorative scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-scan" />

              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-pink-500 block rounded-sm shadow-[0_0_10px_#ec4899]" />
                SEND_MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Your Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Message</label>
                  <textarea 
                    rows="4"
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 resize-none"
                    placeholder="Project details..."
                  />
                </div>

                <button 
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className={`w-full py-4 px-6 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden ${
                    formStatus === 'success' 
                      ? 'bg-green-500 text-black hover:bg-green-400'
                      : 'bg-cyan-600 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]'
                  }`}
                >
                  {formStatus === 'idle' && (
                    <>
                      <span>Transmit Data</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                  {formStatus === 'submitting' && (
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  )}
                  {formStatus === 'success' && (
                    <>
                      <span>Transmission Complete</span>
                      <CheckCircle size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;2