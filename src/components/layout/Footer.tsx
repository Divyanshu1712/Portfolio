'use client';

import Link from 'next/link';
import { socialLinks } from '@/data/social';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const footerNav = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'divyanshusrivastava619@gmail.com', href: 'mailto:divyanshusrivastava619@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9026118735', href: 'tel:+919026118735' },
  { icon: MapPin, label: 'Location', value: 'Basti, Uttar Pradesh, India', href: null },
];

const socialIcons = [
  { name: 'GitHub', href: socialLinks.github, icon: Github },
  { name: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
  { name: 'Twitter / X', href: socialLinks.twitter, icon: Twitter },
  { name: 'Instagram', href: socialLinks.instagram, icon: Instagram },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-neutral-800 bg-[#050505] text-white mt-4 sm:mt-8">
      {/* Top Subtle Accent Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">

          {/* Column 1 — Brand & Overview */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-white w-fit">
              DIVYANSHU<span className="text-blue-500">.</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              Full Stack Developer specializing in FastAPI backends, workflow automation, and sleek modern UI experiences.
            </p>
            <p className="text-xs text-neutral-500">
              Available for full-time roles & freelance opportunities.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-widest">
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {footerNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-400 hover:text-blue-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact Information & Socials (Moved from Contact.tsx) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-neutral-200 uppercase tracking-widest">
              Contact Information
            </h3>
            <div className="space-y-3">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 group-hover:border-blue-500/50 transition-colors flex-shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-500 leading-none">{label}</p>
                    {href ? (
                      <a href={href} className="text-xs sm:text-sm font-medium text-neutral-300 hover:text-blue-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm font-medium text-neutral-300">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              {socialIcons.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-blue-500/50 hover:bg-neutral-800 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} Divyanshu Srivastava. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-blue-400 transition-colors duration-200 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}