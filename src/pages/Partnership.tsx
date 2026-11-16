import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import MagneticButton from '../components/MagneticButton';
import BottomNavSection from '../components/BottomNavSection';

export const Partnership: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    companyName: '',
    projectType: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const data = new FormData();
      data.append('form-name', 'partnership');
      data.append('companyName', formData.companyName);
      data.append('projectType', formData.projectType);
      data.append('email', formData.email);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ companyName: '', projectType: '', email: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="bg-black min-h-screen">
      <PageHeader
        title="Forge the Future."
        subtitle="Strategic Alliances"
        image="/assets/solar-2-new.png"
      />

      {/* 1. Header Intro */}
      <section className="py-24 md:py-32 px-6 md:px-8 border-b border-white/5">
        <div className="container mx-auto">
          <div className="max-w-4xl text-center mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-8 text-[#F4F4F4]">
              Let&apos;s Build the Grid of the Next Decade.
            </h2>
            <p className="text-xl text-[#A3A3A3] leading-relaxed mb-12">
              Solikos is actively seeking partnerships with commercial property developers, industrial park operators, and DisCos looking to stabilize their networks. We provide the capital, the compliance, and the engineering.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Sentence Form */}
      <section
        id="contact"
        className="py-32 px-6 bg-[#0a0a0a] border-t border-white/10 min-h-screen flex items-center"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 text-[#F4F4F4]">
              Ready to bridge the gap? <br />
              <span className="text-[#A3A3A3]">Let&apos;s build the grid.</span>
            </h2>
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h3 className="text-4xl md:text-5xl font-medium text-[#F4F4F4] mb-6">
                Thank You!
              </h3>
              <p className="text-xl text-[#A3A3A3] max-w-lg mx-auto leading-relaxed">
                Your partnership inquiry has been received. Our team will reach out within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm font-medium text-[#F4F4F4] underline underline-offset-4 hover:text-[#B5B0A1] transition-colors"
              >
                Submit another inquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              name="partnership"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="partnership" />
              <input type="hidden" name="bot-field" />

              <div className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.5] md:leading-[1.6] tracking-tight text-[#F4F4F4]">
                &ldquo;Hi Solikos, I am representing{' '}
                <input
                  type="text"
                  name="companyName"
                  placeholder="[ Company Name ]"
                  value={formData.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  required
                  className="bg-transparent border-b-2 border-white/20 focus:border-white outline-none text-center text-[#A3A3A3] focus:text-white transition-colors w-[280px] md:w-[400px] placeholder:text-white/20 placeholder:font-light"
                />{' '}
                and we are looking for a reliable partner for a{' '}
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={(e) => handleFieldChange('projectType', e.target.value)}
                  required
                  className="bg-transparent border-b-2 border-white/20 focus:border-white outline-none text-center text-[#A3A3A3] focus:text-white transition-colors cursor-pointer appearance-none w-[220px] md:w-[300px]"
                >
                  <option value="" className="bg-black text-white">
                    Select Project
                  </option>
                  <option value="minigrid" className="bg-black text-white">
                    Mini-Grid
                  </option>
                  <option value="consultancy" className="bg-black text-white">
                    Consultancy
                  </option>
                  <option value="infrastructure" className="bg-black text-white">
                    Infrastructure
                  </option>
                </select>{' '}
                project. You can reach me at{' '}
                <input
                  type="email"
                  name="email"
                  placeholder="[ Email Address ]"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  required
                  className="bg-transparent border-b-2 border-white/20 focus:border-white outline-none text-center text-[#A3A3A3] focus:text-white transition-colors w-[280px] md:w-[400px] placeholder:text-white/20 placeholder:font-light"
                />{' '}
                to discuss the details.&rdquo;
              </div>

              <div className="pt-12">
                <MagneticButton
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`inline-flex items-center justify-center px-12 py-5 rounded-full border text-sm font-medium tracking-widest uppercase transition-colors ${
                    status === 'submitting'
                      ? 'border-white/30 text-white/50 cursor-not-allowed'
                      : status === 'error'
                      ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                      : 'border-white/30 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {status === 'submitting'
                    ? 'Submitting...'
                    : status === 'error'
                    ? 'Error - Try Again'
                    : 'Initiate Partnership ➔'}
                </MagneticButton>

                {status === 'error' && (
                  <p className="mt-4 text-sm text-red-500 font-mono">
                    Something went wrong. Please try again or email us directly at info@solikosenergyltd.com.
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </div>
      </section>

      {/* 3. Bottom Navigation Section */}
      <BottomNavSection />
    </main>
  );
};

export default Partnership;
