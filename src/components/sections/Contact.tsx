'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Send, Sparkles } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
      defaultValues: { name: '', email: '', message: '' },
    });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Submission failed');
      reset();
      setToast({ type: 'success', message: result.message || 'Message sent successfully!' });
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    } finally {
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      title="Let's Connect"
      subtitle="Have a project in mind or want to collaborate? Drop me a line below."
      className="pb-6 sm:pb-10 pt-16 sm:pt-20"
    >
      <div className="max-w-2xl mx-auto">
        {/* Sleek Compact Glassmorphic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Subtle Glow Background Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              <span>Send a Message</span>
            </h3>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <Sparkles className="w-3 h-3" /> Quick Response
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* 2-Column Compact Layout for Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Your Name"
                  className={`form-input text-sm py-2.5 rounded-xl ${
                    errors.name ? 'border-destructive/60' : ''
                  }`}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Your Email"
                  className={`form-input text-sm py-2.5 rounded-xl ${
                    errors.email ? 'border-destructive/60' : ''
                  }`}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Compact Message Textarea */}
            <div>
              <textarea
                {...register('message')}
                placeholder="Your Message..."
                rows={3}
                className={`form-textarea text-sm py-2.5 rounded-xl ${
                  errors.message ? 'border-destructive/60' : ''
                }`}
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
            </div>

            {/* Sleek Glowing Pill Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending Message…
                </span>
              ) : (
                'Send Message →'
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, x: 16 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${
              toast.type === 'success' ? 'toast-success' : 'toast-error'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}