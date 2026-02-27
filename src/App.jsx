import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Browse from './pages/Browse'
import ItemDetail from './pages/ItemDetail'
import CreateListing from './pages/CreateListing'
import Turf from './pages/Turf'
import Dashboard from './pages/Dashboard'
import GuardianDashboard from './pages/GuardianDashboard'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Safety from './pages/Safety'
import Exchange from './pages/Exchange'
import ActivityPage from './pages/Activity'
import Notifications from './pages/Notifications'
import Suggestions from './pages/Suggestions'
import Scheduler from './pages/Scheduler'
import Sell from './pages/Sell'
import FreeShare from './pages/FreeShare'
import TurfSlot from './pages/TurfSlot'
import TurfCalendar from './pages/TurfCalendar'
import WalletPage from './pages/WalletPage'
import Transactions from './pages/Transactions'
import AddCredits from './pages/AddCredits'
import SafetyCenter from './pages/SafetyCenter'
import TrustScore from './pages/TrustScore'
import DisputesPage from './pages/Disputes'
import GuardianHome from './pages/GuardianHome'
import GuardianPermissions from './pages/GuardianPermissions'
import GuardianApprovals from './pages/GuardianApprovals'
import GuardianActivity from './pages/GuardianActivity'
import GuardianSettings from './pages/GuardianSettings'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsers from './pages/AdminUsers'
import AdminModeration from './pages/AdminModeration'
import AdminDisputes from './pages/AdminDisputes'
import AdminReports from './pages/AdminReports'
import AdminSettings from './pages/AdminSettings'
import AboutPage from './pages/AboutPage'
import PrivacyInfo from './pages/PrivacyInfo'
import TermsConditions from './pages/TermsConditions'
import CommunityChallenges from './pages/CommunityChallenges'
import ImpactDashboard from './pages/ImpactDashboard'
import FeedbackPage from './pages/FeedbackPage'

import { ThemeContext, AgeContext, AuthContext } from './contexts'

// Route guard component
function RoleGuard({ children, allowedRoles, user }) {
  if (!user) return <Navigate to="/login" replace />
  if (!allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

function App() {
  const [theme, setTheme] = useState('light')
  const [ageGroup, setAgeGroup] = useState(null)
  const [user, setUser] = useState(null) // { email, role }

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const login = (email, role) => {
    setUser({ email, role })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AgeContext.Provider value={{ ageGroup, setAgeGroup }}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Routes>
            {/* Public pages — no layout shell */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Main app with layout — requires login */}
            <Route element={<Layout />}>
              {/* Kid routes */}
              <Route path="/home" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><Home /></RoleGuard>
              } />
              <Route path="/browse" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><Browse /></RoleGuard>
              } />
              <Route path="/item/:id" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><ItemDetail /></RoleGuard>
              } />
              <Route path="/create" element={
                <RoleGuard allowedRoles={['kid']} user={user}><CreateListing /></RoleGuard>
              } />
              <Route path="/turf" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Turf /></RoleGuard>
              } />
              <Route path="/dashboard" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Dashboard /></RoleGuard>
              } />
              <Route path="/guardian-dashboard" element={
                <RoleGuard allowedRoles={['guardian']} user={user}><GuardianDashboard /></RoleGuard>
              } />
              <Route path="/profile" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><Profile /></RoleGuard>
              } />
              <Route path="/messages" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><Messages /></RoleGuard>
              } />
              <Route path="/safety" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Safety /></RoleGuard>
              } />
              <Route path="/exchange" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Exchange /></RoleGuard>
              } />
              <Route path="/my-activity" element={
                <RoleGuard allowedRoles={['kid']} user={user}><ActivityPage /></RoleGuard>
              } />
              <Route path="/notifications" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><Notifications /></RoleGuard>
              } />
              <Route path="/suggestions" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Suggestions /></RoleGuard>
              } />
              <Route path="/lend" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Scheduler /></RoleGuard>
              } />
              <Route path="/sell" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Sell /></RoleGuard>
              } />
              <Route path="/free-share" element={
                <RoleGuard allowedRoles={['kid']} user={user}><FreeShare /></RoleGuard>
              } />
              <Route path="/requests" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Dashboard /></RoleGuard>
              } />
              <Route path="/turf/:id" element={
                <RoleGuard allowedRoles={['kid']} user={user}><TurfSlot /></RoleGuard>
              } />
              <Route path="/turf-calendar" element={
                <RoleGuard allowedRoles={['kid']} user={user}><TurfCalendar /></RoleGuard>
              } />
              <Route path="/wallet" element={
                <RoleGuard allowedRoles={['kid']} user={user}><WalletPage /></RoleGuard>
              } />
              <Route path="/transactions" element={
                <RoleGuard allowedRoles={['kid']} user={user}><Transactions /></RoleGuard>
              } />
              <Route path="/credits" element={
                <RoleGuard allowedRoles={['kid']} user={user}><AddCredits /></RoleGuard>
              } />
              <Route path="/safety-center" element={
                <RoleGuard allowedRoles={['kid']} user={user}><SafetyCenter /></RoleGuard>
              } />
              <Route path="/trust-score" element={
                <RoleGuard allowedRoles={['kid']} user={user}><TrustScore /></RoleGuard>
              } />
              <Route path="/disputes" element={
                <RoleGuard allowedRoles={['kid']} user={user}><DisputesPage /></RoleGuard>
              } />

              {/* Guardian routes */}
              <Route path="/guardian" element={
                <RoleGuard allowedRoles={['guardian']} user={user}><GuardianHome /></RoleGuard>
              } />
              <Route path="/guardian/permissions" element={
                <RoleGuard allowedRoles={['guardian']} user={user}><GuardianPermissions /></RoleGuard>
              } />
              <Route path="/guardian/approvals" element={
                <RoleGuard allowedRoles={['guardian']} user={user}><GuardianApprovals /></RoleGuard>
              } />
              <Route path="/guardian/activity" element={
                <RoleGuard allowedRoles={['guardian']} user={user}><GuardianActivity /></RoleGuard>
              } />
              <Route path="/guardian/settings" element={
                <RoleGuard allowedRoles={['guardian']} user={user}><GuardianSettings /></RoleGuard>
              } />

              {/* Admin routes */}
              <Route path="/admin" element={
                <RoleGuard allowedRoles={['admin']} user={user}><AdminDashboard /></RoleGuard>
              } />
              <Route path="/admin/users" element={
                <RoleGuard allowedRoles={['admin']} user={user}><AdminUsers /></RoleGuard>
              } />
              <Route path="/admin/moderation" element={
                <RoleGuard allowedRoles={['admin']} user={user}><AdminModeration /></RoleGuard>
              } />
              <Route path="/admin/disputes" element={
                <RoleGuard allowedRoles={['admin']} user={user}><AdminDisputes /></RoleGuard>
              } />
              <Route path="/admin/reports" element={
                <RoleGuard allowedRoles={['admin']} user={user}><AdminReports /></RoleGuard>
              } />
              <Route path="/admin/settings" element={
                <RoleGuard allowedRoles={['admin']} user={user}><AdminSettings /></RoleGuard>
              } />

              {/* Shared / public-ish pages (accessible by all logged-in users) */}
              <Route path="/about" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><AboutPage /></RoleGuard>
              } />
              <Route path="/privacy" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><PrivacyInfo /></RoleGuard>
              } />
              <Route path="/terms" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><TermsConditions /></RoleGuard>
              } />
              <Route path="/challenges" element={
                <RoleGuard allowedRoles={['kid']} user={user}><CommunityChallenges /></RoleGuard>
              } />
              <Route path="/impact" element={
                <RoleGuard allowedRoles={['kid']} user={user}><ImpactDashboard /></RoleGuard>
              } />
              <Route path="/feedback" element={
                <RoleGuard allowedRoles={['kid', 'guardian', 'admin']} user={user}><FeedbackPage /></RoleGuard>
              } />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </AgeContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
