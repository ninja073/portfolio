import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { fadeInLeft, fadeInRight } from '@/animations/variants'
import { personal, socialLinks } from '@/data/personal'
import { useTheme } from '@/context/useTheme'

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [shakeField, setShakeField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Minimum 10 characters'
    return errs
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)

    const firstError = Object.keys(errs)[0]
    if (firstError) {
      setShakeField(firstError)
      setTimeout(() => setShakeField(null), 500)
      return
    }

    setIsSubmitting(true)
    // Simulated submission
    await new Promise((r) => setTimeout(r, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const inputBase = `w-full rounded-xl border px-4 py-3 font-mono text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-electric-blue/50 ${
    isDark
      ? 'border-dark-border bg-dark-surface text-gray-200 placeholder-gray-600'
      : 'border-light-border bg-white text-gray-900 placeholder-gray-400'
  }`

  const contactInfo = [
    { icon: Mail, label: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: personal.phone, href: `tel:+917829340831` },
    { icon: MapPin, label: personal.location },
  ]

  return (
    <SectionWrapper id="contact">
      <SectionHeading title="Get in Touch" subtitle="// let's connect" />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Contact info */}
        <motion.div
          className="flex flex-col justify-center"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className={`mb-8 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            I'm always open to discussing new projects, creative ideas, or opportunities to
            be part of your vision. Let's build something great together.
          </p>

          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric-blue/10">
                  <Icon size={18} className="text-electric-blue" />
                </div>
                {href ? (
                  <a
                    href={href}
                    className={`font-mono text-sm transition-colors hover:text-electric-blue ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {label}
                  </a>
                ) : (
                  <span className={`font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-8 flex gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`rounded-xl border p-3 transition-colors ${
                  isDark
                    ? 'border-dark-border text-gray-500 hover:border-electric-blue/50 hover:text-electric-blue'
                    : 'border-light-border text-gray-400 hover:border-electric-blue/50 hover:text-electric-blue'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.platform}
              >
                <span className="font-mono text-xs">{link.platform.charAt(0)}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Contact form */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GlassCard className="p-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  >
                    <CheckCircle size={56} className="text-green-500" />
                  </motion.div>
                  <h3 className={`mt-4 text-xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    Message Sent!
                  </h3>
                  <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsSubmitted(false)
                      setForm({ name: '', email: '', message: '' })
                    }}
                    className="mt-4"
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={`mb-1.5 block font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Name *
                    </label>
                    <motion.div animate={shakeField === 'name' ? { x: [0, -10, 10, -10, 0] } : {}}>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`${inputBase} ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Your name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                      />
                    </motion.div>
                    {errors.name && <p className="mt-1 font-mono text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`mb-1.5 block font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Email *
                    </label>
                    <motion.div animate={shakeField === 'email' ? { x: [0, -10, 10, -10, 0] } : {}}>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`${inputBase} ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="your@email.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                    </motion.div>
                    {errors.email && <p className="mt-1 font-mono text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={`mb-1.5 block font-mono text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Message *
                    </label>
                    <motion.div animate={shakeField === 'message' ? { x: [0, -10, 10, -10, 0] } : {}}>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputBase} resize-none ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Tell me about your project..."
                        aria-required="true"
                        aria-invalid={!!errors.message}
                      />
                    </motion.div>
                    {errors.message && <p className="mt-1 font-mono text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    icon={
                      isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Send size={18} />
                      )
                    }
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
