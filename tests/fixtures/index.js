import { test as base } from '@playwright/test'
import {
  NavbarPage,
  HeroPage,
  AboutPage,
  ExperiencePage,
  SkillsPage,
  ContactPage,
} from '../pages/index.js'

export const test = base.extend({
  navbarPage: async ({ page }, use) => {
    await use(new NavbarPage(page))
  },
  heroPage: async ({ page }, use) => {
    await use(new HeroPage(page))
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page))
  },
  experiencePage: async ({ page }, use) => {
    await use(new ExperiencePage(page))
  },
  skillsPage: async ({ page }, use) => {
    await use(new SkillsPage(page))
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page))
  },
})

export { expect } from '@playwright/test'
