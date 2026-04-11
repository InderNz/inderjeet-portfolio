export class HeroPage {
  constructor(page) {
    this.page = page
  }

  heroSection = () => this.page.locator('#home')
  firstName = () => this.page.getByText('Inderjeet').first()
  lastName = () => this.page.getByText('Singh').first()
  titleLabel = () => this.page.getByText('AI Quality Engineering Leader')
  tagline = () => this.page.getByText(/energised by two things/i)
  profilePhoto = () => this.page.locator('img[alt="Inderjeet Singh"]')
  stat20Years = () => this.page.getByText('20+').first()
  stat37Percent = () => this.page.getByText('37%')
  stat120Team = () => this.page.getByText('120+')
  stat6Certs = () => this.page.getByText(/active \+ in progress/i)
  backgroundLink = () => this.page.getByText('My background')
  workHistoryLink = () => this.page.getByText('My work history')
  getInTouchLink = () => this.page.getByText('Get in touch')
}
