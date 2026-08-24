export const USER_ANALYTICS_DATA = {
  summary: {
    totalVerifications: 128,
    trueClaims: 73,
    falseClaims: 31,
    misleadingClaims: 24,
    unverifiedClaims: 12,
    averageConfidence: 89.4,
    timeSavedHours: 42
  },
  volumeOverTime: [
    { date: 'Mon', verifications: 14, claims: 8, media: 6 },
    { date: 'Tue', verifications: 19, claims: 11, media: 8 },
    { date: 'Wed', verifications: 28, claims: 16, media: 12 },
    { date: 'Thu', verifications: 22, claims: 14, media: 8 },
    { date: 'Fri', verifications: 35, claims: 21, media: 14 },
    { date: 'Sat', verifications: 18, claims: 10, media: 8 },
    { date: 'Sun', verifications: 24, claims: 15, media: 9 }
  ],
  verdictDistribution: [
    { name: 'True Claims', value: 73, color: '#22c55e' },
    { name: 'False Claims', value: 31, color: '#ef4444' },
    { name: 'Misleading', value: 24, color: '#f59e0b' },
    { name: 'Unverified', value: 12, color: '#94a3b8' }
  ],
  confidenceDistribution: [
    { range: '90-100%', count: 64 },
    { range: '80-89%', count: 38 },
    { range: '70-79%', count: 18 },
    { range: '50-69%', count: 8 }
  ],
  contentTypeDistribution: [
    { type: 'Text Claims', count: 58, percentage: 45 },
    { type: 'URLs / Web', count: 32, percentage: 25 },
    { type: 'Images / Forensics', count: 20, percentage: 16 },
    { type: 'Videos / Deepfakes', count: 12, percentage: 9 },
    { type: 'PDF / Documents', count: 6, percentage: 5 }
  ]
};

export const ADMIN_ANALYTICS_DATA = {
  stats: {
    totalUsers: 1482,
    activeUsers: 934,
    totalVerifications: 28450,
    todayVerifications: 684,
    flaggedContent: 42,
    systemErrors: 3
  },
  userGrowth: [
    { month: 'Mar', users: 320, active: 210 },
    { month: 'Apr', users: 510, active: 380 },
    { month: 'May', users: 780, active: 560 },
    { month: 'Jun', users: 1050, active: 740 },
    { month: 'Jul', users: 1290, active: 870 },
    { month: 'Aug', users: 1482, active: 934 }
  ],
  apiThroughput: [
    { hour: '00:00', requests: 120, latencyMs: 140 },
    { hour: '04:00', requests: 80, latencyMs: 130 },
    { hour: '08:00', requests: 450, latencyMs: 180 },
    { hour: '12:00', requests: 890, latencyMs: 220 },
    { hour: '16:00', requests: 1120, latencyMs: 240 },
    { hour: '20:00', requests: 760, latencyMs: 190 }
  ],
  aiTokenUsage: [
    { model: 'Gemini 1.5 Pro', tokensK: 14200, cost: '$28.40' },
    { model: 'TruthWeave Forensics Vision', tokensK: 8900, cost: '$17.80' },
    { model: 'DuckDuckGo Search Ingest', queries: 24300, cost: '$0.00' }
  ]
};
