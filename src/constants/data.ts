import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export type ServantBot = {
  id: string;
  unitId: string;
  name: string;
  location: string;
  facility: string;
  status: 'active' | 'idle' | 'charging' | 'maintenance' | 'offline';
  batteryLevel: number;
  connectivity: 'connected' | 'disconnected';
  currentTask: string | null;
  tasksCompleted: number;
  lastMaintenance: string;
  uptime: string;
  alerts: number;
  primaryMode?: 'healthcare' | 'home-assistance' | 'hybrid';
  capabilities?: string[];
  network?: {
    ssid: string;
    signalStrength: number;
  };
  emergencyContact?: string;
  notes?: string;
  autoStart?: boolean;
  enableAlerts?: boolean;
  createdAt: string;
  updatedAt: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'ServantBot Fleet',
    url: '/dashboard/servantbot',
    icon: 'bot',
    shortcut: ['s', 'b'],
    isActive: false,
    items: [
      {
        title: 'All Bots',
        url: '/dashboard/servantbot',
        icon: 'list',
        shortcut: ['s', 'a']
      },
      {
        title: 'Deploy New Bot',
        url: '/dashboard/servantbot/new',
        icon: 'plus',
        shortcut: ['s', 'n']
      },
      {
        title: 'Maintenance',
        url: '/dashboard/servantbot/maintenance',
        icon: 'tool',
        shortcut: ['s', 'm']
      },
      {
        title: 'Analytics',
        url: '/dashboard/servantbot/analytics',
        icon: 'chart',
        shortcut: ['s', 'r']
      }
    ]
  },

  {
    title: 'Facilities',
    url: '/dashboard/facilities',
    icon: 'home', // or 'home'
    shortcut: ['f', 'f'],
    isActive: false,
    items: [
      {
        title: 'Chisinau Assisted Living',
        url: '/dashboard/facilities/chisinau',
        icon: 'mapPin',
        shortcut: ['f', 'c']
      },
      {
        title: 'Balti Care Center',
        url: '/dashboard/facilities/balti',
        icon: 'mapPin',
        shortcut: ['f', 'b']
      },
      {
        title: 'All Facilities',
        url: '/dashboard/facilities',
        icon: 'list',
        shortcut: ['f', 'a']
      }
    ]
  },
  {
    title: 'Monitoring',
    url: '/dashboard/monitoring',
    icon: 'activity', // or 'monitor'
    shortcut: ['m', 'o'],
    isActive: false,
    items: [
      {
        title: 'Live Status',
        url: '/dashboard/monitoring/live',
        icon: 'pulse',
        shortcut: ['m', 'l']
      },
      {
        title: 'Alerts',
        url: '/dashboard/monitoring/alerts',
        icon: 'alert',
        shortcut: ['m', 'a']
      },
      {
        title: 'Health Metrics',
        url: '/dashboard/monitoring/health',
        icon: 'heart',
        shortcut: ['m', 'h']
      }
    ]
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

// Recent ServantBot Activities (replacing sales data for the dashboard)
export interface ServantBotActivity {
  id: number;
  botName: string;
  unitId: string;
  activity: string;
  location: string;
  time: string;
  status: 'completed' | 'in-progress' | 'alert';
}

export const recentActivitiesData: ServantBotActivity[] = [
  {
    id: 1,
    botName: 'MediBot Alpha',
    unitId: 'SB-MD-001',
    activity: 'Medication delivered to Maria Popescu',
    location: 'Room 204',
    time: '5 min ago',
    status: 'completed'
  },
  {
    id: 2,
    botName: 'CareBot Beta',
    unitId: 'SB-MD-002',
    activity: 'Vital signs monitoring',
    location: 'Room 108',
    time: '12 min ago',
    status: 'in-progress'
  },
  {
    id: 3,
    botName: 'AssistBot Gamma',
    unitId: 'SB-MD-003',
    activity: 'Fall detection alert resolved',
    location: 'Hallway B2',
    time: '25 min ago',
    status: 'alert'
  },
  {
    id: 4,
    botName: 'HealthBot Delta',
    unitId: 'SB-MD-004',
    activity: 'Meal delivery completed',
    location: 'Dining Hall',
    time: '45 min ago',
    status: 'completed'
  },
  {
    id: 5,
    botName: 'ServeBot Epsilon',
    unitId: 'SB-MD-005',
    activity: 'Mobility assistance provided',
    location: 'Recreation Room',
    time: '1 hour ago',
    status: 'completed'
  }
];

// Facility data for the ServantBot system
export interface Facility {
  id: string;
  name: string;
  address: string;
  city: string;
  totalBots: number;
  activeBots: number;
  patients: number;
  staff: number;
  alerts: number;
}

export const facilitiesData: Facility[] = [
  {
    id: 'chisinau-assisted',
    name: 'Chisinau Assisted Living',
    address: 'Str. Stefan cel Mare 123',
    city: 'Chisinau',
    totalBots: 5,
    activeBots: 4,
    patients: 120,
    staff: 45,
    alerts: 0
  },
  {
    id: 'balti-care',
    name: 'Balti Care Center',
    address: 'Str. Independentei 45',
    city: 'Balti',
    totalBots: 3,
    activeBots: 3,
    patients: 80,
    staff: 30,
    alerts: 1
  },
  {
    id: 'comrat-senior',
    name: 'Comrat Senior Home',
    address: 'Str. Lenin 67',
    city: 'Comrat',
    totalBots: 2,
    activeBots: 1,
    patients: 50,
    staff: 20,
    alerts: 0
  },
  {
    id: 'cahul-medical',
    name: 'Cahul Medical Center',
    address: 'Str. Republicii 89',
    city: 'Cahul',
    totalBots: 2,
    activeBots: 2,
    patients: 60,
    staff: 25,
    alerts: 0
  }
];
