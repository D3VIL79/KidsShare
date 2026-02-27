import { Shield, Lock, Eye, Users, Bell, Trash2 } from 'lucide-react'
import './PrivacyInfo.css'
// Privacy Policy Page Component

const SECTIONS = [
    {
        icon: Eye, title: 'Information We Collect', color: '#6C5CE7',
        items: [
            'Name, age, and age group for verification purposes',
            'Email address and phone number for account security',
            'Guardian contact information for users under 18',
            'Listing content, exchange history, and chat messages',
            'Device information and usage analytics (anonymized)',
        ],
    },
    {
        icon: Lock, title: 'How We Use Your Data', color: '#00b894',
        items: [
            'To verify age and provide age-appropriate experiences',
            'To match users for exchanges and suggestions',
            'To monitor safety through AI content moderation',
            'To enable guardian oversight of minor accounts',
            'To improve platform safety and detect abuse patterns',
        ],
    },
    {
        icon: Shield, title: 'Data Protection', color: '#00CEC9',
        items: [
            'All data is encrypted in transit (TLS 1.3) and at rest (AES-256)',
            'No personal data is shared with third parties for marketing',
            'Chat messages are filtered in real-time but not stored permanently',
            'Guardian-accessible data is limited to activity summaries only',
            'Regular security audits conducted by independent firms',
        ],
    },
    {
        icon: Users, title: "Children's Privacy (COPPA & IT Act)", color: '#FDCB6E',
        items: [
            'Verifiable parent/guardian consent required for users under 13',
            'No behavioral advertising targeted at minors',
            'Personal information of children is never sold or shared',
            'Guardians can review, delete, or restrict their child\'s data',
            'Compliant with the DPDP Act 2023 and IT Act 2000',
        ],
    },
    {
        icon: Bell, title: 'Communication & Notifications', color: '#e17055',
        items: [
            'Safety alerts are always delivered and cannot be disabled',
            'Marketing communications require explicit opt-in',
            'Guardians receive notifications for all child account activity',
            'You can manage notification preferences in Settings',
        ],
    },
    {
        icon: Trash2, title: 'Data Deletion & Rights', color: '#0984e3',
        items: [
            'You can request complete account and data deletion at any time',
            'Data is permanently removed within 30 days of deletion request',
            'You may request a copy of all your stored data (DSAR)',
            'Right to correct inaccurate personal information',
        ],
    },
]

export default function PrivacyInfo() {
    return (
        <div className="privacy-page">
            <div className="container">
                <div className="pp-header">
                    <span className="pp-badge"><Lock size={12} /> Legal</span>
                    <h1>Privacy Policy</h1>
                    <p>Last updated: February 17, 2026 · Effective for all users</p>
                </div>

                <div className="pp-intro">
                    <p>At KidShare Hub, your privacy — especially the privacy of young users — is our highest priority. This policy explains what data we collect, how we use it, and the strong measures we take to protect it. We comply with India's Digital Personal Data Protection (DPDP) Act 2023, the IT Act 2000, and international standards like COPPA.</p>
                </div>

                <div className="pp-sections">
                    {SECTIONS.map((s, idx) => {
                        const SIcon = s.icon
                        return (
                            <div key={idx} className="pp-section">
                                <div className="pp-sec-icon" style={{ background: `${s.color}12`, color: s.color }}><SIcon size={18} /></div>
                                <h2>{s.title}</h2>
                                <ul>
                                    {s.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        )
                    })}
                </div>

                <div className="pp-contact">
                    <h3>Questions?</h3>
                    <p>Contact our Data Protection Officer at <strong>privacy@kidsharehub.com</strong> or call <strong>1800-KIDSHARE</strong></p>
                </div>
            </div>
        </div>
    )
}
