export class AboutPage {
  constructor(page) {
    this.page = page
  }

  aboutSection = () => this.page.locator('#about')
  heading = () => this.page.getByText(/Building Quality/i)
  leadershipCard = () => this.page.getByText('Strategic Test Leadership')
  aiTestingCard = () => this.page.getByText('AI-Augmented Testing')
  fintechCard = () => this.page.getByText(/Fintech & Regulatory/i)
  locationCard = () => this.page.getByText(/Palmerston North-based/i)
  bodyText20Years = () => this.page.getByText(/20\+ years/i).first()
  bodyTextShawbrook = () => this.page.getByText(/Shawbrook Bank/i).first()
  bodyTextHAY = () => this.page.getByText(/HAY Bank/i).first()
  bodyTextNZ = () => this.page.getByText(/New Zealand/i).first()
}
