'use client';

import Link from 'next/link';
import { socialLinks } from '@/data/social';
import { siteConfig } from '@/config/site';
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react';

const footerNav = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
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
    <footer className="relative border-t border-border/60 bg-card/30 backdrop-blur-sm mt-24">
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-bold gradient-text w-fit">
              Divyanshu.
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full Stack Developer building scalable backend systems, automation pipelines,
              and clean user interfaces.
            </p>
            <p className="text-xs text-muted-foreground/60">
              Open to full-time and freelance opportunities.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Navigation
            </h3>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Social + Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialIcons.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href={`mailto:divyanshusrivastava619@gmail.com`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
            >
              divyanshusrivastava619@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/70 text-center sm:text-left">
            © {new Date().getFullYear()} Divyanshu Srivastava. Built with{' '}
            <span className="text-primary/80">Next.js</span> &{' '}
            <span className="text-primary/80">shadcn/ui</span>.
          </p>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-muted-foreground/70 hover:text-primary transition-colors duration-200 group"
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