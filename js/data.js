
/**
 * PRODESK IT — data.js
 * Sprint 2 · Phase 1: JSON Data Payload
 * All hardcoded content now lives here and is injected into the DOM at runtime.
 */

'use strict';

const PRODESK_DATA = {

  /* ── COMPANY ─────────────────────────────────────────────── */
  company: {
    name: 'Prodesk IT',
    tagline: 'Enterprise Infrastructure &amp; Managed IT Services',
    description: 'Prodesk IT engineers cloud-native infrastructure, managed security, and DevOps pipelines for enterprise teams.',
    sla: '99.9% uptime SLA. Sub-4-minute P1 response.',
    since: 2018,
    deployments: '200+',
    phone: '+1-800-555-0199',
    email: 'hello@prodeskIT.com'
  },

  /* ── HERO ─────────────────────────────────────────────────── */
  hero: {
    eyebrow: 'Infrastructure Without Compromise',
    headline: 'Build the backbone your enterprise deserves',
    sub: 'We engineer cloud-native infrastructure, hardened security, and DevOps pipelines — so your team ships faster and sleeps better.',
    ctaPrimary:  { label: 'Start Your Project',   href: '#contact' },
    ctaSecondary:{ label: 'See Our Work',          href: '#services' },
    badge: {
      stat: '99.9%',
      label: 'Uptime SLA'
    }
  },

  /* ── SERVICES ─────────────────────────────────────────────── */
  services: {
    eyebrow: 'What We Build',
    title: 'End-to-end IT services<br>for serious teams',
    sub: 'From bare-metal to serverless, we engineer the digital backbone your organisation needs to operate at scale — and stay there.',
    items: [
      {
        id: 'cloud',
        title: 'Cloud Migration',
        desc: 'Zero-downtime migration to AWS, Azure, or GCP — full cost modelling, network redesign, and 90-day hypercare as standard.',
        image: 'assets/images/cloud-service.png',
        alt: 'Cloud Migration',
        tags: ['AWS', 'Azure', 'GCP', 'Terraform']
      },
      {
        id: 'security',
        title: 'Managed Security',
        desc: '24/7 SOC-as-a-service with zero-trust network architecture and compliance — ISO 27001, SOC 2 Type II, and GDPR.',
        image: 'assets/images/security-service.png',
        alt: 'Managed Security',
        tags: ['SOC 2', 'ISO 27001', 'GDPR', 'SIEM']
      },
      {
        id: 'devops',
        title: 'DevOps &amp; CI/CD',
        desc: 'Kubernetes orchestration, GitOps pipelines, and platform engineering — ship confidently 40× a day.',
        image: 'assets/images/devops-service.png',
        alt: 'DevOps & CI/CD',
        tags: ['Kubernetes', 'Helm', 'ArgoCD', 'GitHub Actions']
      },
      {
        id: 'network',
        title: 'Network Infrastructure',
        desc: 'SD-WAN design, data centre interconnects, and global load balancing — sub-10ms latency across all regions.',
        image: 'assets/images/network-service.png',
        alt: 'Network Infrastructure',
        tags: ['SD-WAN', 'BGP', 'MPLS', 'Anycast']
      },
      {
        id: 'observability',
        title: 'Observability Stack',
        desc: 'Full-stack monitoring with real-time dashboards, distributed tracing, and intelligent alerting end-to-end.',
        image: 'assets/images/observability-service.png',
        alt: 'Observability Stack',
        tags: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry']
      },
      {
        id: 'dr',
        title: 'Disaster Recovery',
        desc: 'Geo-redundant backups with RPO &lt;15 min and automated failover tested live against your SLA targets.',
        image: 'assets/images/dr-service.png',
        alt: 'Disaster Recovery',
        tags: ['RPO &lt;15min', 'RTO &lt;30min', 'Velero', 'S3 Cross-region']
      }
    ]
  },

  /* ── PROCESS ──────────────────────────────────────────────── */
  process: {
    eyebrow: 'Our Process',
    title: 'How we turn complexity<br>into clarity',
    sub: 'Every engagement follows our proven four-phase framework — so you always know what\'s happening and why.',
    steps: [
      {
        number: '01',
        title: 'Discovery & Audit',
        desc: 'We map your current estate — network topology, cloud spend, security posture — and identify every risk and optimisation opportunity.'
      },
      {
        number: '02',
        title: 'Architecture Design',
        desc: 'Our engineers produce a detailed target architecture: infrastructure-as-code blueprints, runbooks, and a phased migration plan.'
      },
      {
        number: '03',
        title: 'Execution & Migration',
        desc: 'We deploy in controlled windows with automated rollback gates — zero unplanned downtime is a hard requirement, not a goal.'
      },
      {
        number: '04',
        title: 'Operate & Optimise',
        desc: '24/7 managed operations, monthly cost-optimisation reports, and quarterly architecture reviews to keep you ahead of demand.'
      }
    ]
  },

  /* ── METRICS ──────────────────────────────────────────────── */
  metrics: {
    eyebrow: 'By the Numbers',
    title: 'Results that speak<br>for themselves',
    sub: 'Measured outcomes across 200+ enterprise deployments since 2018.',
    items: [
      { value: 99.9, suffix: '%',  label: 'Uptime SLA<br>Guaranteed',   decimals: 1, ariaLabel: '99.9 percent uptime SLA' },
      { value: 200,  suffix: '+',  label: 'Enterprise<br>Clients',      decimals: 0, ariaLabel: '200 plus enterprise clients' },
      { value: 38,   suffix: '%',  label: 'Avg. Cost<br>Reduction',     decimals: 0, ariaLabel: '38 percent cost reduction' },
      { value: 4,    prefix: '<',  suffix: 'm', label: 'P1 Incident<br>Response', decimals: 0, ariaLabel: 'less than 4 minute response' },
      { value: 18,   suffix: '',   label: 'Countries<br>Served',        decimals: 0, ariaLabel: '18 countries' }
    ]
  },

  /* ── TESTIMONIALS ─────────────────────────────────────────── */
  testimonials: {
    eyebrow: 'Client Stories',
    title: 'What our clients say',
    sub: 'Real outcomes from enterprise engineering teams who trusted us with their most critical infrastructure.',
    items: [
      {
        quote: 'Prodesk migrated our entire on-prem stack to AWS in six weeks with zero unplanned downtime. Infrastructure costs dropped 38% in Q1 — exactly what they projected.',
        name: 'Rahul Sharma',
        role: 'CTO, Axiom Corp',
        initials: 'RS',
        stars: 5
      },
      {
        quote: 'Their security team found a critical vulnerability our internal team had missed for eight months. SOC 2 Type II cert came three weeks ahead of schedule.',
        name: 'Laura Mitchell',
        role: 'Head of Engineering, Meridian Finance',
        initials: 'LM',
        stars: 5
      },
      {
        quote: 'We went from weekly releases to shipping 40+ times a day. The DevOps pipeline Prodesk built is the backbone of everything we take to production now.',
        name: 'Arjun Kapoor',
        role: 'VP Engineering, Orbis Logistics',
        initials: 'AK',
        stars: 5
      }
    ]
  },

  /* ── CTA / CONTACT ────────────────────────────────────────── */
  cta: {
    eyebrow: 'Ready to start?',
    title: 'Let\'s engineer something<br><em>remarkable</em>',
    sub: 'Tell us about your infrastructure challenges and we\'ll respond with a no-obligation architecture assessment within 24 hours.',
    primaryBtn:   { label: 'Schedule a Call',      href: '#' },
    secondaryBtn: { label: 'View Case Studies',    href: '#clients' },
    note: 'No lock-in contracts. Cancel any managed service with 30 days\' notice.'
  },

  /* ── NAV LINKS ────────────────────────────────────────────── */
  navLinks: [
    { label: 'Services', href: '#services' },
    { label: 'Process',  href: '#process'  },
    { label: 'Results',  href: '#results'  },
    { label: 'Clients',  href: '#clients'  },
    { label: 'Contact',  href: '#contact'  }
  ]
};