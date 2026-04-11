export class NavbarPage {
  constructor(page) {
    this.page = page
  }

  navbar = () => this.page.locator('nav')
  homeIcon = () => this.page.locator('nav a').first()
  aboutLink = () => this.page.getByRole('link', { name: /^about$/i })
  experienceLink = () => this.page.getByRole('link', { name: /^experience$/i })
  skillsLink = () => this.page.getByRole('link', { name: /^skills$/i })
  currentFocusLink = () => this.page.getByRole('link', { name: /^current focus$/i })
  contactLink = () => this.page.getByRole('link', { name: /^contact$/i })

  async clickAbout() { await this.aboutLink().click() }
  async clickExperience() { await this.experienceLink().click() }
  async clickSkills() { await this.skillsLink().click() }
  async clickCurrentFocus() { await this.currentFocusLink().click() }
  async clickContact() { await this.contactLink().click() }
}
