export class ExperiencePage {
  constructor(page) {
    this.page = page
  }

  experienceSection = () => this.page.locator('#experience')
  heading = () => this.page.getByText('20+ Years of Delivery')
  quinnoxTitle = () => this.page.getByText('Senior Testing Manager')
  quinnoxCompany = () => this.page.getByText('Quinnox Consultancy Services')
  quinnoxDate = () => this.page.getByText(/Jun 2006/i)
  shawbrookName = () => this.page.locator('#experience').getByText('Shawbrook Bank', { exact: true })
  shawbrookDate = () => this.page.locator('#experience').getByText(/Jan 2020/i).first()
  shawbrook120 = () => this.page.locator('#experience').getByText(/120\+ members/i).first()
  hayBankName = () => this.page.locator('#experience').getByText('HAY Bank', { exact: true })
  hayBankDate = () => this.page.locator('#experience').getByText(/Oct 2018/i).first()
  hayBankAPRA = () => this.page.locator('#experience').getByText(/APRA/i).first()
  wmName = () => this.page.locator('#experience').getByText('Waste Management Inc.', { exact: true })
  wmDate = () => this.page.locator('#experience').getByText(/Feb 2011/i).first()
  wmFortune = () => this.page.locator('#experience').getByText(/Fortune 500/i).first()
  intelText = () => this.page.locator('#experience').getByText(/Intel Technologies/i).first()
  netcradleText = () => this.page.locator('#experience').getByText(/Netcradle/i).first()
  educationMSS = () => this.page.getByText(/Master of Software Systems/i)
  educationUni = () => this.page.getByText(/Kurukshetra University/i).first()
}
