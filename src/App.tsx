import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, CodeXml, Github, Globe, Layers, Linkedin, Mail, Menu, Send, Smartphone, Sparkles, X } from 'lucide-react'
import portrait from '../app/assets/images/profile-orange.png'
import resume from '../public/Lovely-Joy-Figueras-Resume.pdf?url'
import { capabilities, projects, sections, tools, type SectionId } from './data'

export function createEmailUrl(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${name.trim()}`)
  const body = encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`)
  return `mailto:lovelyfigueras@gmail.com?subject=${subject}&body=${body}`
}

function Navigation({ activeSection }: { activeSection: SectionId }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="container header">
      <a href="#home" className="brand" aria-label="Lovely, home"><span>L</span> LOVELY</a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {sections.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>
        ))}
      </nav>
      <a className="button header-contact" href="#contact">Contact Now</a>
      <button id="menu-toggle" className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
        {sections.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container two-columns about-layout">
        <ul className="services">
          {[{ title: 'Android Development', icon: Smartphone }, { title: 'AI Integration', icon: Sparkles }, { title: 'Web Development', icon: Globe }].map(({ title, icon: Icon }) => (
            <li key={title}><span className="service-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3></li>
          ))}
        </ul>
        <div>
          <h2 id="about-heading">About me</h2>
          <p className="about-copy">I'm a software engineer with 5 years of experience building Android apps and web features. I currently work on payment software, including EMV-compliant transaction flows and production releases.</p>
          <p className="about-copy">My path into software began after several years in customer service, which taught me to listen carefully, stay calm under pressure, and explain complex problems clearly. I bring that perspective to collaborative teams and take ownership from investigation through release.</p>
          <dl className="stats">
            {[['5', 'Years of experience'], ['3', 'Companies'], ['600', 'Training hours']].map(([number, label]) => (
              <div key={label}><dt>{label}</dt><dd>{number} <span>+</span></dd></div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section container" aria-labelledby="skills-heading">
      <div className="section-heading">
        <h2 id="skills-heading">Building Reliable Software</h2>
        <p>I build and ship features for mobile and web products - from first commit to production deployment.</p>
      </div>
      <div className="two-columns skills-grid">
        <article className="skill-card">
          <h3><span className="skill-icon"><CodeXml aria-hidden="true" /></span>What I can do</h3>
          <p>I help teams build and ship production-ready software:</p>
          <ul className="bullet-list capabilities">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="skill-card">
          <h3><span className="skill-icon"><Layers aria-hidden="true" /></span>Tools I Use</h3>
          <p>I use proven tools and technologies to build reliable products:</p>
          <ul className="bullet-list tools">{tools.map((row) => <li key={row.group}><strong>{row.group}:</strong><span>{row.tools}</span></li>)}</ul>
        </article>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section container" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="projects-heading">Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <article key={project.title} className={`two-columns project ${index % 2 ? 'project-reversed' : ''}`}>
            <div className="project-description">
              <h3>{project.title}</h3>
              <ul className="tags" aria-label="Technologies">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <p>{project.description}</p>
              <div className="project-actions">
                <a className="button" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View GitHub for ${project.title}`}><Github size={16} aria-hidden="true" />View GitHub</a>
                <a className="text-link" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.liveLabel} for ${project.title}`}>{project.liveLabel}<ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <div className={`project-media ${project.mobile ? 'mobile-project' : ''} ${project.title === 'Budgety' ? 'budgety-project' : ''}`}>
              <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" decoding="async" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [draftReady, setDraftReady] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    window.location.href = createEmailUrl(String(data.get('name') ?? ''), String(data.get('email') ?? ''), String(data.get('message') ?? ''))
    setDraftReady(true)
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container contact-content">
        <p className="eyebrow contact-eyebrow">Contacts</p>
        <form className="two-columns contact-form" onSubmit={handleSubmit}>
          <div>
            <h2 id="contact-heading">Have a project?<br />Let's talk!</h2>
            <div className="social-links">
              <a href="mailto:lovelyfigueras@gmail.com" aria-label="Email" title="Email"><Mail /></a>
              <a href="https://github.com/lfigueras" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Github /></a>
              <a href="https://www.linkedin.com/in/lovely-joy-figueras" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><Linkedin /></a>
            </div>
          </div>
          <div className="contact-fields">
            <div><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" maxLength={120} required /></div>
            <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required /></div>
            <div><label htmlFor="message">Message</label><textarea id="message" name="message" rows={4} maxLength={4000} required /></div>
            <div className="contact-actions">
              <button type="submit" className="button contact-submit"><Send size={16} aria-hidden="true" />Open email draft</button>
              <p className="contact-hint">Opens your email app so you can review and send the message.</p>
              {draftReady && <p className="contact-status" role="status">Your email draft is ready. You can also email <a href="mailto:lovelyfigueras@gmail.com">lovelyfigueras@gmail.com</a> directly.</p>}
            </div>
          </div>
        </form>
      </div>
      <footer><p>Lovely Joy Figueras</p><small>Designed with love - all rights reserved &copy; {new Date().getFullYear()}.</small></footer>
    </section>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id as SectionId)
      }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <nav className="section-indicator" aria-label="Section navigation">
        {sections.map(({ id, label }) => <a key={id} href={`#${id}`} title={label} aria-label={label} aria-current={activeSection === id ? 'location' : undefined}><span /></a>)}
      </nav>
      <main id="main">
        <section id="home" className="hero" aria-labelledby="home-heading">
          <Navigation activeSection={activeSection} />
          <div className="container two-columns hero-body">
            <div>
              <p className="eyebrow">My name is Lovely</p>
              <h1 id="home-heading">I'm a Developer<span className="cursor" aria-hidden="true" /></h1>
              <div className="hero-actions"><a href="#projects" className="button">Let's Start</a><a className="button button-outline" href={resume} target="_blank" rel="noopener noreferrer">My Resume</a></div>
            </div>
            <div className="portrait"><img src={portrait} alt="Illustrated portrait of Lovely Joy Figueras" width={380} height={380} fetchPriority="high" /></div>
          </div>
        </section>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}