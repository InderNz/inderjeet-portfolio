export class ExperiencePage {
  constructor(page) {
    this.page = page
  }

  experienceSection = () => this.page.locator('#experience')
  heading = () => this.page.getByText('20+ Years of Delivery')
  quinnoxTitle = () => this.page.getByText('Senior Testing Manager')
  quinnoxCompany = () => this.page.getByText('Quinnox Consultancy Services')
  quinnoxDate = () => this.page.getByText(/Jun 2006/i)
  shawbrookName = () => this.page.getByText('Shawbrook Bank')
  shawbrookDate = () => this.page.getByText(/Jan 2020/i)
  shawbrook120 = () => this.page.getByText(/120\+ members/i)
  hayBankName = () => this.page.getByText('HAY Bank')
  hayBankDate = () => this.page.getByText(/Oct 2018/i)
  hayBankAPRA = () => this.page.getByText(/APRA/i).first()
  wmName = () => this.page.getByText('Waste Management Inc.')
  wmDate = () => this.page.getByText(/Feb 2011/i)
  wmFortune = () => this.page.getByText(/Fortune 500/i)
  intelText = () => this.page.getByText(/Intel Technologies/i)
  netcradleText = () => this.page.getByText(/Netcradle/i)
  educationMSS = () => this.page.getByText(/Master of Software Systems/i)
  educationUni = () => this.page.getByText(/Kurukshetra University/i).first()
}
