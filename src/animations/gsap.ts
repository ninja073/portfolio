/**
 * Central GSAP plugin registration.
 * Import { gsap, ScrollTrigger, Draggable, InertiaPlugin } from here
 * to ensure plugins are only registered once across the app.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)

export { gsap, ScrollTrigger, Draggable, InertiaPlugin }
