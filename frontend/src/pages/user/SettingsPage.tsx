import React, { useState } from 'react';
import {
  User,
  Lock,
  Bell,
  Sliders,
  Check,
  Save,
  Laptop,
  Smartphone,
  Copy
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [activeSection, setActiveSection] = useState<'account' | 'security' | 'notifications' | 'preferences'>('account');
  const [name, setName] = useState(user?.name || 'Sarah Chen');
  const [email, setEmail] = useState(user?.email || 'sarah.chen@truthweave.ai');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Notifications State
  const [notifyVerifications, setNotifyVerifications] = useState(true);
  const [notifySecurity, setNotifySecurity] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(false);

  // Preferences State
  const [language, setLanguage] = useState('English (US)');
  const [defaultMode, setDefaultMode] = useState('claim');

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) return;
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Platform & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your security preferences, notification dispatches, and verification defaults.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveSection('account')}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold transition-all ${
              activeSection === 'account'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            <User size={16} />
            <span>Account Profile</span>
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold transition-all ${
              activeSection === 'security'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            <Lock size={16} />
            <span>Security & Sessions</span>
          </button>

          <button
            onClick={() => setActiveSection('notifications')}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold transition-all ${
              activeSection === 'notifications'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            <Bell size={16} />
            <span>Notification Alerts</span>
          </button>

          <button
            onClick={() => setActiveSection('preferences')}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-semibold transition-all ${
              activeSection === 'preferences'
                ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
            }`}
          >
            <Sliders size={16} />
            <span>Preferences</span>
          </button>
        </div>

        {/* Form Container (3 Cols) */}
        <div className="md:col-span-3 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
          {/* SECTION: Account */}
          {activeSection === 'account' && (
            <form onSubmit={handleSaveAccount} className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Account Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">Update your public name and primary email address</p>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
                  alt="Avatar"
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-700"
                />
                <div>
                  <div className="text-xs font-bold text-white">Profile Photo</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Supports JPG, PNG up to 2MB</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {savedSuccess && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 flex items-center gap-2">
                  <Check size={15} />
                  <span>Account profile saved successfully.</span>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <Button type="submit" variant="gradient" size="md" icon={<Save size={15} />}>
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* SECTION: Security */}
          {activeSection === 'security' && (
            <div className="space-y-8">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="pb-4 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">Change Password</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Ensure your account uses a long, unique password</p>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                {passwordSuccess && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 flex items-center gap-2">
                    <Check size={15} />
                    <span>Password updated securely.</span>
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" variant="secondary" size="md">
                    Update Password
                  </Button>
                </div>
              </form>

              {/* Active Sessions */}
              <div className="space-y-3 pt-6 border-t border-slate-800">
                <h4 className="text-sm font-bold text-white">Active Sessions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
                    <div className="flex items-center gap-3">
                      <Laptop size={18} className="text-sky-400" />
                      <div>
                        <div className="font-semibold text-slate-200">Chrome on Windows 11 (Current)</div>
                        <div className="text-[10px] text-slate-500">127.0.0.1 • Active Now</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">
                    <div className="flex items-center gap-3">
                      <Smartphone size={18} className="text-slate-400" />
                      <div>
                        <div className="font-semibold text-slate-200">TruthWeave iOS App</div>
                        <div className="text-[10px] text-slate-500">192.168.1.12 • 2 days ago</div>
                      </div>
                    </div>
                    <button className="text-[11px] text-rose-400 hover:underline">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Notifications */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Notification Preferences</h3>
                <p className="text-xs text-slate-400 mt-0.5">Control which platform alerts you receive</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div>
                    <div className="text-xs font-bold text-white">Verification Completed Alerts</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Receive immediate notification when multi-source verification completes</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyVerifications}
                    onChange={(e) => setNotifyVerifications(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div>
                    <div className="text-xs font-bold text-white">Security & Forensics Alerts</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Alerts for suspicious deepfake media or high-risk disinformation spikes</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifySecurity}
                    onChange={(e) => setNotifySecurity(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div>
                    <div className="text-xs font-bold text-white">Weekly Verification Digest</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Summary of claims verified and aggregate accuracy trends</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifyWeekly}
                    onChange={(e) => setNotifyWeekly(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Preferences */}
          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h3 className="text-base font-bold text-white">Platform Preferences</h3>
                <p className="text-xs text-slate-400 mt-0.5">Customize your defaults and interface options</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Default Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Default Ingest Modality</label>
                  <select
                    value={defaultMode}
                    onChange={(e) => setDefaultMode(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="claim">Statement / Claim Text</option>
                    <option value="upload">File & Media Upload</option>
                    <option value="url">Webpage URL</option>
                  </select>
                </div>
              </div>

              {/* API Token Preview */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    API Access Token (Client Interceptor)
                  </label>
                  <span className="text-[10px] text-sky-400 font-mono">v1 REST Ready</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 font-mono text-xs text-slate-400">
                  <span className="truncate flex-1">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...mock_jwt</span>
                  <button
                    onClick={() => navigator.clipboard.writeText('mock_jwt_token_sample')}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Copy Token"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
