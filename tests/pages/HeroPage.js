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
  stat120Team = () => this.page.locator('#home').getByText('120+', { exact: true })
  stat6Certs = () => this.page.getByText(/active \+ in progress/i)
  backgroundLink = () => this.page.getByRole('link', { name: /my background/i }).first()
  workHistoryLink = () => this.page.getByRole('link', { name: /my work history/i }).first()
  getInTouchLink = () => this.page.getByRole('link', { name: /get in touch/i }).first()
  skillsLink = () => this.page.getByRole('link', { name: /skills & certifications/i }).first()
  currentFocusLink = () => this.page.getByRole('link', { name: /explore my current focus/i }).first()
  githubLink = () => this.page.getByRole('link', { name: /github/i }).filter({ has: this.page.locator('svg') })
  whereToStartLabel = () => this.page.getByText('Where to start')
}
