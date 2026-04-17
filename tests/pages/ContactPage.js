export class ContactPage {
  constructor(page) {
    this.page = page
  }

  contactSection = () => this.page.locator('#contact')
  heading = () => this.page.getByText(/Let's work/i)
  emailText = () => this.page.getByText('nz.inderjeet@gmail.com')
  emailLink = () => this.page.locator('a[href="mailto:nz.inderjeet@gmail.com"]')
  linkedinLink = () => this.page.locator('a[href*="linkedin.com/in/inderjeet-singh"]')
  location = () => this.page.locator('#contact').getByText('Palmerston North, New Zealand', { exact: true })
  seniorQARole = () => this.page.locator('#contact').getByText('Senior QA / Test Manager', { exact: true })
  headOfQualityRole = () => this.page.locator('#contact').getByText('Head of Quality', { exact: true })
  aiQALeadRole = () => this.page.locator('#contact').getByText('AI Quality Engineering Lead', { exact: true })
  qaConsultantRole = () => this.page.locator('#contact').getByText('QA Consultant / Advisor', { exact: true })
  availabilityText = () => this.page.getByText(/Available for immediate start/i)
}
