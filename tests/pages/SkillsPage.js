export class SkillsPage {
  constructor(page) {
    this.page = page
  }

  skillsSection = () => this.page.locator('#skills')
  heading = () => this.page.locator('#skills').getByRole('heading', { name: 'Skills & Certifications' })
  testManagementRow = () => this.page.locator('#skills').getByText('Test Management & Leadership', { exact: true })
  testStrategyRow = () => this.page.locator('#skills').getByText('Test Strategy & Planning', { exact: true })
  testAutomationRow = () => this.page.locator('#skills').getByText('Test Automation', { exact: true })
  aiToolsRow = () => this.page.locator('#skills').getByText('AI & Automation Tools', { exact: true })
  agileRow = () => this.page.locator('#skills').getByText('Agile & DevOps Quality', { exact: true })
  regulatoryRow = () => this.page.locator('#skills').getByText('Regulatory & Compliance', { exact: true })
  hallucinationTag = () => this.page.locator('#current-focus').getByText('Hallucination Testing', { exact: true })
  biasTag = () => this.page.locator('#current-focus').getByText('Bias Detection', { exact: true })
  langSmithTag = () => this.page.locator('#current-focus').getByText('LangSmith', { exact: true })
  nistTag = () => this.page.locator('#current-focus').getByText('NIST AI RMF', { exact: true })
  safeCert = () => this.page.getByText('SAFe 6 Agilist')
  prince2Cert = () => this.page.getByText('PRINCE2 Agile Practitioner')
  csmCert = () => this.page.getByText('Certified Scrum Master (CSM)')
  istqbCtAI = () => this.page.getByText('ISTQB CT-AI')
  azureAI = () => this.page.getByText('Azure AI-900')
  activeBadges = () => this.page.getByText('Active')
  inProgressBadges = () => this.page.getByText('In Progress')
}
