'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Layout components
import Layout from '@/components/layout/Layout';

// Section components
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Projects from '@/components/sections/Projects';
import TwitterFeed from '@/components/sections/TwitterFeed';

// UI components
import { Button } from "@/components/ui/Button";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Fix hydration mismatch by only rendering client-specific content after mounting
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Get form values for API submission
    const formData = {
      name: nameInputRef.current?.value || '',
      email: emailInputRef.current?.value || '',
      message: messageInputRef.current?.value || '',
    };
    
    setIsSubmitting(true);
    
    try {
      // Submit to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Reset form on success
      form.reset();
      
      // Focus back on the name input for better UX
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
      
      // Show success message
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Only run this effect on the client
    if (!mounted) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
      fadeElements.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, [mounted]);

  // If not mounted yet, render a simple placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <Layout>
        <main className="min-h-screen bg-black pt-16">
          <div className="flex items-center justify-center h-screen">
            {/* Simple loading state with no animations */}
            <div className="text-white">Loading...</div>
          </div>
        </main>
      </Layout>
    );
  }

  // Main component render (only on client)
  return (
    <Layout>
      <main className="min-h-screen bg-black pt-16">
        {/* Hero Section */}
        <section className="flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-black py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            {/* Avatar Container */}
            <motion.div 
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/Profile-avtar.jpg"
                alt="Divyanshu Srivastava Avatar"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
            
            {/* Intro Text */}
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I&apos;m Divyanshu 👋
            </motion.p>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I build digital products that are functional & beautiful.
            </motion.h1>
            
            {/* Subheading */}
            <motion.p 
              className="text-base sm:text-lg mb-8 text-gray-300 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I&apos;m a Full-Stack Developer and UI/UX Designer.
              I specialize in building modern web apps and intuitive, clean user interfaces.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="#contact">
                <Button 
                  variant="primary" 
                  size="lg"
                >
                  Connect With Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-black">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Image */}
            <motion.div
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full border-2 border-white/20 p-1 overflow-hidden w-full h-full shadow-lg">
                <Image 
                  src="/your-profile-image.jpg" // Updated path
                  alt="Divyanshu Srivastava Profile Picture"
                  width={320} 
                  height={320}
                  className="rounded-full object-cover w-full h-full"
                  onError={(e) => {
                    // Use a consistent fallback image to prevent hydration mismatch
                    const target = e.currentTarget;
                    if (mounted) {
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDMyMCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMjIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2VlZSI+RGl2eWFuc2h1PC90ZXh0Pjwvc3ZnPg==';
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-base sm:text-lg leading-relaxed text-white/80">
                Hi, I&apos;m Divyanshu Srivastava, a passionate Full Stack Developer with a
                solid foundation in web development, blockchain, and IoT. With a
                Bachelor of Technology degree in the Internet of Things, I&apos;ve developed
                a keen eye for crafting solutions that combine creativity and technical
                efficiency. My expertise lies in modern frontend and backend
                technologies like React, Python, and Node.js, and I&apos;m always excited to
                tackle new challenges that push the boundaries of what&apos;s possible in
                the tech world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Skills />
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Experience />
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Education />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Projects />
        </section>

        {/* Twitter Feed Section */}
        <section id="twitter" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <TwitterFeed />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Let&apos;s Connect 🚀
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="card border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4">Send me a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required
                      className="form-input focus:ring-2 focus:ring-white/20"
                      ref={nameInputRef}
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      required
                      className="form-input focus:ring-2 focus:ring-white/20"
                      ref={emailInputRef}
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your Message" 
                      required
                      className="form-textarea focus:ring-2 focus:ring-white/20"
                      rows={5}
                      ref={messageInputRef}
                    ></textarea>
                  </div>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card border-white/10 backdrop-blur-sm h-full">
                <h3 className="text-xl sm:text-2xl font-semibold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Email</p>
                      <a href="mailto:divyanshusrivastava619@gmail.com" className="text-base sm:text-lg hover:text-white transition-colors duration-300">
                        divyanshusrivastava619@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Phone</p>
                      <a href="tel:+919026118735" className="text-base sm:text-lg hover:text-white transition-colors duration-300">
                        +91 9026118735
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Location</p>
                      <p className="text-base sm:text-lg">
                        Basti, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <p className="text-sm text-white/60 mb-4">Follow me on social media</p>
                    <div className="flex space-x-4">
                      <a 
                        href="https://github.com/Divyanshu1712" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/divyanshu-srivastava-558403215" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a 
                        href="https://x.com/Divyans19896602" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        aria-label="Twitter/X"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a 
                        href="https://www.instagram.com/_._divyanshu___" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg flex items-center"
              >
                <svg
                  className="w-6 h-6 mr-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-white/90 text-sm mt-1">Your message has been saved. Thank you for reaching out.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </Layout>
  );
}
