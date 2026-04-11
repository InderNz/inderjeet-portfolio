export class ContactPage {
  constructor(page) {
    this.page = page
  }

  contactSection = () => this.page.locator('#contact')
  heading = () => this.page.getByText(/Let's work/i)
  emailText = () => this.page.getByText('nz.inderjeet@gmail.com')
  emailLink = () => this.page.locator('a[href="mailto:nz.inderjeet@gmail.com"]')
  linkedinLink = () => this.page.locator('a[href*="linkedin.com/in/inderjeet-singh"]')
  location = () => this.page.getByText('Palmerston North, New Zealand')
  seniorQARole = () => this.page.getByText('Senior QA / Test Manager')
  headOfQualityRole = () => this.page.getByText('Head of Quality')
  aiQALeadRole = () => this.page.getByText('AI Quality Engineering Lead')
  qaConsultantRole = () => this.page.getByText('QA Consultant / Advisor')
  availabilityText = () => this.page.getByText(/Available for immediate start/i)
}
