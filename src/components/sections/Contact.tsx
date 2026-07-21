'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, CheckCircle, XCircle } from 'lucide-react';
import SectionWrapper from '@/components/shared/SectionWrapper';
import { socialLinks } from '@/data/social';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'divyanshusrivastava619@gmail.com', href: 'mailto:divyanshusrivastava619@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9026118735', href: 'tel:+919026118735' },
  { icon: MapPin, label: 'Location', value: 'Basti, Uttar Pradesh, India', href: null },
];

const socialItems = [
  { icon: Github, label: 'GitHub', href: socialLinks.github },
  { icon: Linkedin, label: 'LinkedIn', href: socialLinks.linkedin },
  { icon: Twitter, label: 'Twitter', href: socialLinks.twitter },
  { icon: Instagram, label: 'Instagram', href: socialLinks.instagram },
];

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
      subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('name')}
                type="text"
                placeholder="Your Name"
                className={`form-input ${errors.name ? 'border-destructive/60' : ''}`}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Your Email"
                className={`form-input ${errors.email ? 'border-destructive/60' : ''}`}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Your Message"
                rows={5}
                className={`form-textarea ${errors.message ? 'border-destructive/60' : ''}`}
              />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending…
                </span>
              ) : 'Send Message'}
            </Button>
          </form>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-8 flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>

            <div className="space-y-5">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="contact-icon flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground/85 hover:text-primary transition-colors duration-200">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground/85">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/40">
              <p className="text-xs text-muted-foreground mb-4">Find me on social media</p>
              <div className="flex gap-3">
                {socialItems.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-icon"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
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
            {toast.type === 'success'
              ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
              : <XCircle className="w-5 h-5 flex-shrink-0" />
            }
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}