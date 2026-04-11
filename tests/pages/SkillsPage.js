export class SkillsPage {
  constructor(page) {
    this.page = page
  }

  skillsSection = () => this.page.locator('#skills')
  heading = () => this.page.getByText('Skills & Certifications')
  testManagementRow = () => this.page.getByText('Test Management & Leadership')
  testStrategyRow = () => this.page.getByText('Test Strategy & Planning')
  testAutomationRow = () => this.page.getByText('Test Automation')
  aiToolsRow = () => this.page.getByText('AI & Automation Tools')
  agileRow = () => this.page.getByText('Agile & DevOps Quality')
  regulatoryRow = () => this.page.getByText('Regulatory & Compliance')
  hallucinationTag = () => this.page.getByText('Hallucination Testing')
  biasTag = () => this.page.getByText('Bias Detection')
  langSmithTag = () => this.page.getByText('LangSmith')
  nistTag = () => this.page.getByText('NIST AI RMF')
  safeCert = () => this.page.getByText('SAFe 6 Agilist')
  prince2Cert = () => this.page.getByText('PRINCE2 Agile Practitioner')
  csmCert = () => this.page.getByText('Certified Scrum Master (CSM)')
  istqbCtAI = () => this.page.getByText('ISTQB CT-AI')
  azureAI = () => this.page.getByText('Azure AI-900')
  activeBadges = () => this.page.getByText('Active')
  inProgressBadges = () => this.page.getByText('In Progress')
}
