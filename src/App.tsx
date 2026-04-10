import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

function App() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nitish Jaiswal',
    jobTitle: 'Senior Frontend Engineer',
    description: 'Senior Frontend Engineer with 8+ years of experience in B2B fintech.',
    sameAs: [
      'https://github.com/ninja073',
      'https://linkedin.com/in/nitishjaiswal-792aa2b1',
    ],
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Helmet>

      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
