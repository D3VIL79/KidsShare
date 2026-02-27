import { FileText, Shield, Users, ShoppingBag, AlertTriangle, Ban, Scale } from 'lucide-react'
import './TermsConditions.css'

const TERMS = [
    {
        icon: Users, title: 'Eligibility & Accounts', color: '#6C5CE7',
        clauses: [
            'Users must be between 7 and 25 years old to join KidShare Hub.',
            'Users under 13 require verifiable parent/guardian consent to create an account.',
            'Users aged 13-17 must have a linked guardian account for full platform access.',
            'One account per person. Sharing accounts is strictly prohibited.',
            'You are responsible for maintaining the confidentiality of your login credentials.',
        ],
    },
    {
        icon: ShoppingBag, title: 'Listings & Exchanges', color: '#00b894',
        clauses: [
            'All listings must be age-appropriate and comply with community guidelines.',
            'Items listed must be legally owned by the user and safe for exchange.',
            'Prohibited items include: weapons, alcohol, tobacco, medications, counterfeit goods.',
            'The platform reserves the right to remove any listing without prior notice.',
            'Exchange disputes must be filed within 7 days of the transaction.',
        ],
    },
    {
        icon: Shield, title: 'Safety & Conduct', color: '#00CEC9',
        clauses: [
            'Users must not share personal information (phone numbers, addresses) in chats.',
            'Harassment, bullying, or threatening behavior results in immediate suspension.',
            'All meetups should occur in public, well-lit areas with guardian knowledge.',
            'Users must not impersonate others or create fake accounts.',
            'AI moderation may automatically filter or flag content for safety.',
        ],
    },
    {
        icon: Scale, title: 'Wallet & Financial Terms', color: '#FDCB6E',
        clauses: [
            'Credits are non-refundable virtual currency for platform use only.',
            'Age-based spending limits are enforced and cannot be bypassed.',
            'Guardian approval is required for all financial transactions by minors.',
            'The platform charges commission on sales (8%) and rentals (10%).',
            'Fraudulent transactions will result in immediate account termination.',
        ],
    },
    {
        icon: Ban, title: 'Violations & Penalties', color: '#e17055',
        clauses: [
            'First offense: Written warning and temporary feature restriction.',
            'Second offense: 14-day account suspension and trust score reduction.',
            'Third offense: Permanent ban from the platform.',
            'Severe violations (scams, harassment) may result in immediate permanent ban.',
            'Appeals can be filed within 30 days of any penalty through the Disputes page.',
        ],
    },
    {
        icon: AlertTriangle, title: 'Limitation of Liability', color: '#0984e3',
        clauses: [
            'KidShare Hub facilitates connections but is not responsible for the condition of exchanged items.',
            'Users participate in meetups and exchanges at their own risk.',
            'The platform is not liable for losses arising from unauthorized account access.',
            'Service availability is provided on an "as-is" basis without guarantees.',
            'These terms are governed by the laws of India and subject to jurisdiction of Indian courts.',
        ],
    },
]

export default function TermsConditions() {
    return (
        <div className="terms-page">
            <div className="container">
                <div className="tc-header">
                    <span className="tc-badge"><FileText size={12} /> Legal</span>
                    <h1>Terms & Conditions</h1>
                    <p>Last updated: February 17, 2026 · Please read carefully before using KidShare Hub</p>
                </div>

                <div className="tc-intro">
                    <p>By creating an account or using KidShare Hub, you agree to the following terms and conditions. These terms apply to all users including children, guardians, and administrators. If you are under 18, your guardian must also agree to these terms.</p>
                </div>

                <div className="tc-sections">
                    {TERMS.map((t, idx) => {
                        const TIcon = t.icon
                        return (
                            <div key={idx} className="tc-section">
                                <div className="tc-sec-head">
                                    <div className="tc-sec-icon" style={{ background: `${t.color}12`, color: t.color }}><TIcon size={16} /></div>
                                    <h2>{idx + 1}. {t.title}</h2>
                                </div>
                                <ol className="tc-clauses">
                                    {t.clauses.map((c, i) => <li key={i}>{c}</li>)}
                                </ol>
                            </div>
                        )
                    })}
                </div>

                <div className="tc-footer">
                    <p>Questions about these terms? Contact us at <strong>legal@kidsharehub.com</strong></p>
                </div>
            </div>
        </div>
    )
}
