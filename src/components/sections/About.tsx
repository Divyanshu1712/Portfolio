'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Briefcase,
  FolderGit2,
  Code2,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Gamepad2,
  Trophy,
  Zap,
  Server,
  FileText,
  Lock,
  Activity,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

import SectionWrapper from '@/components/shared/SectionWrapper';

const stats = [
  {
    value: '1.5+ Yrs',
    label: 'Professional Experience',
    icon: Briefcase,
  },
  {
    value: '10+',
    label: 'Production Systems Built',
    icon: FolderGit2,
  },
  {
    value: '15+',
    label: 'Core Tech Stack Tools',
    icon: Code2,
  },
  {
    value: '100%',
    label: 'End-to-End Product Ownership',
    icon: Rocket,
  },
];

const solutionsBuilt = [
  {
    title: 'Automation Platforms & Bot Dashboards',
    icon: Activity,
    description:
      'Engineered enterprise automation platforms and real-time bot execution dashboards with live status telemetry, execution logs, and business metrics.',
    badge: 'FastAPI • WebSockets • React',
  },
  {
    title: 'Vendor Onboarding Workflows',
    icon: Layers,
    description:
      'Built multi-step vendor onboarding pipelines with complex multi-file handling, dynamic form generation, and schema validation using React Hook Form and Zod.',
    badge: 'React • Zod • Hook Form',
  },
  {
    title: 'Secure Authentication & RBAC',
    icon: Lock,
    description:
      'Implemented enterprise-grade security systems utilizing Single Sign-On (SSO), OAuth 2.0, JWT token rotation, and fine-grained Role-Based Access Control.',
    badge: 'OAuth 2.0 • JWT • Security',
  },
  {
    title: 'Intelligent Document Processing',
    icon: FileText,
    description:
      'Designed Python document parsing engines for structured PDF table extraction, layout preservation, and automated PDF-to-Excel data conversion.',
    badge: 'Python • PDF Engine • Automation',
  },
  {
    title: 'High-Performance APIs & Real-Time Services',
    icon: Server,
    description:
      'Developed low-latency RESTful APIs and WebSocket feeds powering real-time data streaming backed by PostgreSQL and FastAPI microservices.',
    badge: 'FastAPI • PostgreSQL • WebSockets',
  },
  {
    title: 'Cloud-Native & Containerized Deployments',
    icon: Cpu,
    description:
      'Packaged and orchestrated microservices using Docker, Nginx, Azure Functions, Azure Static Web Apps, and automated GitHub Actions CI/CD pipelines.',
    badge: 'Azure • Docker • Nginx • CI/CD',
  },
];

const focusAreas = [
  { title: 'System Design', icon: Cpu, desc: 'Designing resilient, modular system architectures' },
  { title: 'Distributed Systems', icon: Server, desc: 'Fault-tolerant multi-node backend design' },
  { title: 'Cloud Architecture', icon: Zap, desc: 'Serverless & containerized Azure deployments' },
  { title: 'High-Performance APIs', icon: Activity, desc: 'Optimized low-latency microservice endpoints' },
  { title: 'AI & Automation Platforms', icon: Sparkles, desc: 'Intelligent data extraction & automation' },
];

const lifePassions = [
  {
    title: 'Football ⚽',
    description: 'Love playing on the pitch and following tactical football strategy.',
  },
  {
    title: 'Esports & Gaming 🎮',
    description: 'Grinding Valorant (clutching 1v3s) or scoring last-minute winners in EA Sports FIFA.',
  },
  {
    title: 'Dancing 🕺',
    description: 'Unwinding with rhythm, dance, and music outside of system design.',
  },
];

const expectations = [
  'End-to-End Product Ownership',
  'Production-Ready Clean Architecture',
  'High-Performance & Low Latency',
  'Robust Security & OAuth/RBAC',
  'Business Problem First Approach',
  'Agile Collaboration & Fast Delivery',
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="Software Engineer & Full Stack Developer passionate about designing scalable systems and solving real business problems."
    >
      <div ref={ref} className="max-w-6xl mx-auto space-y-16">
        {/* INTRODUCTION */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-base md:text-lg leading-8 text-muted-foreground bg-card/60 border border-border/60 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-sm"
        >
          <p>
            Hi, I'm{' '}
            <span className="font-bold text-foreground">
              Divyanshu Srivastava
            </span>{' '}
            — a{' '}
            <span className="text-primary font-bold">
              Software Engineer & Full Stack Developer
            </span>{' '}
            at <span className="font-semibold text-foreground">BOT Mantra</span>, based in Bengaluru, India. I specialize in designing and delivering scalable, production-ready applications that solve real-world business challenges.
          </p>

          <p>
            Over the past few years, I've worked across the full stack using <span className="font-semibold text-foreground">Python (FastAPI), React, TypeScript, PostgreSQL, and Azure</span>. My experience spans backend architecture, secure authentication, real-time WebSocket applications, intelligent document processing pipelines, and cloud-native deployments.
          </p>

          <p className="border-l-2 border-primary pl-4 text-foreground/90 font-medium italic">
            "I enjoy owning products end-to-end — from understanding complex business requirements and designing resilient systems to development, cloud deployment, and production support."
          </p>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              <Icon className="mx-auto h-7 w-7 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl md:text-3xl font-bold gradient-text">
                {value}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* WHAT I'VE BUILT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              Key Systems & Solutions I've Built 🚀
            </h3>
            <p className="text-muted-foreground mt-1">
              Production systems designed and delivered for enterprise performance and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionsBuilt.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-base text-foreground mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <span className="inline-block w-fit px-2.5 py-1 text-[11px] font-mono font-semibold text-primary bg-primary/10 rounded-md border border-primary/15 mt-auto">
                    {item.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ENGINEERING FOCUS AREAS */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              Deepening Engineering Expertise In 🎯
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="rounded-2xl border border-border/80 bg-card p-4 text-center hover:border-primary/40 transition-all duration-200"
                >
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-foreground mb-1">{area.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-tight">{area.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* OUTSIDE OF DEVELOPMENT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <Gamepad2 className="w-7 h-7 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Beyond Engineering & Code ⚽🎮🕺
            </h3>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
            Outside of development, you'll probably find me playing football, dancing, or grinding <span className="font-semibold text-foreground">Valorant</span> and <span className="font-semibold text-foreground">FIFA</span>. If I'm not designing systems, there's a good chance I'm either clutching a 1v3 in Valorant or trying to score a last-minute winner in FIFA!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {lifePassions.map((passion) => (
              <div key={passion.title} className="bg-card/80 border border-border/60 p-4 rounded-xl">
                <h4 className="font-bold text-sm text-foreground mb-1">{passion.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{passion.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WHAT TO EXPECT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <h3 className="text-2xl font-bold mb-6">
            What You Can Expect Working With Me
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {expectations.map((val) => (
              <div
                key={val}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground/90">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-10 text-center"
        >
          <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Let's Build Impactful Products Together
          </h3>
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you're looking to hire a Full Stack Engineer, build an enterprise automation platform, design high-performance FastAPI backends, or bring a new product idea to life, I'm always open to new opportunities and collaborations.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
