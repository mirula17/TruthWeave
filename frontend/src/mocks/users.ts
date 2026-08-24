import type { User, AdminUserItem } from '../types';

export const MOCK_ADMIN_USER: User = {
  id: 'usr-admin-001',
  name: 'Alex Vance',
  email: 'admin@truthweave.ai',
  role: 'ADMIN',
  is_active: true,
  created_at: '2026-01-15T08:30:00Z',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  verifications_count: 142
};

export const MOCK_NORMAL_USER: User = {
  id: 'usr-user-002',
  name: 'Sarah Chen',
  email: 'sarah.chen@truthweave.ai',
  role: 'USER',
  is_active: true,
  created_at: '2026-02-01T11:20:00Z',
  avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  verifications_count: 38
};

export const MOCK_ADMIN_USERS_LIST: AdminUserItem[] = [
  {
    id: 'usr-admin-001',
    name: 'Alex Vance',
    email: 'admin@truthweave.ai',
    role: 'ADMIN',
    isActive: true,
    createdAt: '2026-01-15T08:30:00Z',
    verificationsCount: 142,
    lastActive: 'Just now'
  },
  {
    id: 'usr-user-002',
    name: 'Sarah Chen',
    email: 'sarah.chen@truthweave.ai',
    role: 'USER',
    isActive: true,
    createdAt: '2026-02-01T11:20:00Z',
    verificationsCount: 38,
    lastActive: '12 minutes ago'
  },
  {
    id: 'usr-user-003',
    name: 'Marcus Brody',
    email: 'marcus.b@globalnews.org',
    role: 'USER',
    isActive: true,
    createdAt: '2026-02-10T14:45:00Z',
    verificationsCount: 89,
    lastActive: '2 hours ago'
  },
  {
    id: 'usr-user-004',
    name: 'Elena Rostova',
    email: 'elena.rostova@cybercheck.eu',
    role: 'USER',
    isActive: true,
    createdAt: '2026-02-18T09:15:00Z',
    verificationsCount: 19,
    lastActive: 'Yesterday'
  },
  {
    id: 'usr-user-005',
    name: 'David Kim',
    email: 'dkim@researchlab.io',
    role: 'USER',
    isActive: false,
    createdAt: '2026-02-20T16:00:00Z',
    verificationsCount: 5,
    lastActive: '4 days ago'
  }
];
