import { faker } from '@faker-js/faker';

// Define the shape of ServantBot data
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

// Mock ServantBot data store
export const fakeServantBots = {
  records: [] as ServantBot[], // Holds the list of ServantBot objects

  // Initialize with sample data
  initialize() {
    const sampleServantBots: ServantBot[] = [];

    const facilities = [
      'Chisinau Assisted Living',
      'Balti Care Center',
      'Comrat Senior Home',
      'Cahul Medical Center'
    ];

    const botNames = [
      'MediBot Alpha',
      'CareBot Beta',
      'AssistBot Gamma',
      'HealthBot Delta',
      'ServeBot Epsilon',
      'NurseBot Zeta',
      'GuardBot Eta',
      'CompanionBot Theta',
      'SafetyBot Iota',
      'HelpBot Kappa'
    ];

    const tasks = [
      'Medication Delivery - Room 204',
      'Vitals Check - Room 108',
      'Meal Delivery - Dining Hall',
      'Patient Transfer Assistance',
      'Emergency Response - Floor 2',
      'Routine Patrol - Wing A',
      'Sanitization - Common Areas',
      null
    ];

    const capabilities = [
      'medication-delivery',
      'vitals-monitoring',
      'fall-detection',
      'mobility-assistance',
      'meal-delivery',
      'companionship',
      'emergency-response',
      'cleaning'
    ];

    function generateRandomServantBotData(index: number): ServantBot {
      const id = faker.string.uuid();
      const unitId = `SB-MD-${String(1000 + index).padStart(3, '0')}`;
      const status = faker.helpers.arrayElement([
        'active',
        'idle',
        'charging',
        'maintenance',
        'offline'
      ]);
      const facility = faker.helpers.arrayElement(facilities);
      const floor = faker.helpers.arrayElement(['1', '2', '3', 'Ground']);
      const wing = faker.helpers.arrayElement(['A', 'B', 'C', 'Central']);

      // Generate battery level based on status
      let batteryLevel = faker.number.int({ min: 10, max: 100 });
      if (status === 'charging') {
        batteryLevel = faker.number.int({ min: 10, max: 60 });
      } else if (status === 'offline') {
        batteryLevel = 0;
      }

      // Generate connectivity based on status
      const connectivity = status === 'offline' ? 'disconnected' : 'connected';

      // Generate current task based on status
      const currentTask =
        status === 'active'
          ? faker.helpers.arrayElement(tasks.filter((t) => t !== null))
          : null;

      // Generate uptime based on status
      const uptime =
        status === 'offline'
          ? '0d 0h'
          : `${faker.number.int({ min: 1, max: 45 })}d ${faker.number.int({ min: 0, max: 23 })}h`;

      // Random selection of capabilities
      const selectedCapabilities = faker.helpers.arrayElements(
        capabilities,
        faker.number.int({ min: 3, max: 6 })
      );

      return {
        id,
        unitId,
        name: botNames[index] || faker.helpers.arrayElement(botNames),
        location: `Floor ${floor}, Wing ${wing}`,
        facility,
        status,
        batteryLevel,
        connectivity,
        currentTask,
        tasksCompleted: faker.number.int({ min: 0, max: 50 }),
        lastMaintenance: faker.date
          .recent({ days: 30 })
          .toISOString()
          .split('T')[0],
        uptime,
        alerts:
          status === 'maintenance' ? faker.number.int({ min: 1, max: 3 }) : 0,
        primaryMode: faker.helpers.arrayElement([
          'healthcare',
          'home-assistance',
          'hybrid'
        ]),
        capabilities: selectedCapabilities,
        network: {
          ssid: `${facility.split(' ')[0]}-WiFi-5G`,
          signalStrength: faker.number.int({ min: -80, max: -30 })
        },
        emergencyContact: faker.internet.email(),
        notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
          probability: 0.3
        }),
        autoStart: faker.datatype.boolean(),
        enableAlerts: faker.datatype.boolean({ probability: 0.9 }),
        createdAt: faker.date
          .between({ from: '2023-01-01', to: '2024-01-01' })
          .toISOString(),
        updatedAt: faker.date.recent().toISOString()
      };
    }

    // Generate ServantBot records
    for (let i = 0; i < 20; i++) {
      sampleServantBots.push(generateRandomServantBotData(i));
    }

    this.records = sampleServantBots;
  },

  // Get all ServantBots with optional filtering
  async getAll({
    status = [],
    facility = [],
    search
  }: {
    status?: string[];
    facility?: string[];
    search?: string;
  }) {
    let bots = [...this.records];

    // Filter by status
    if (status.length > 0) {
      bots = bots.filter((bot) => status.includes(bot.status));
    }

    // Filter by facility
    if (facility.length > 0) {
      bots = bots.filter((bot) => facility.includes(bot.facility));
    }

    // Search functionality across multiple fields
    if (search) {
      bots = matchSorter(bots, search, {
        keys: ['name', 'unitId', 'location', 'facility', 'currentTask']
      });
    }

    return bots;
  },

  // Get paginated results with optional filtering
  async getServantBots({
    page = 1,
    limit = 10,
    status,
    facility,
    search
  }: {
    page?: number;
    limit?: number;
    status?: string;
    facility?: string;
    search?: string;
  }) {
    await delay(800); // Simulate network delay

    const statusArray = status ? status.split('.') : [];
    const facilityArray = facility ? facility.split('.') : [];

    const allBots = await this.getAll({
      status: statusArray,
      facility: facilityArray,
      search
    });

    const totalBots = allBots.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedBots = allBots.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'ServantBot fleet data',
      total_bots: totalBots,
      offset,
      limit,
      bots: paginatedBots
    };
  },

  // Get a specific ServantBot by its ID
  async getServantBotById(id: string) {
    await delay(500); // Simulate a delay

    // Find the bot by its ID
    const bot = this.records.find((bot) => bot.id === id);

    if (!bot) {
      return {
        success: false,
        message: `ServantBot with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `ServantBot ${bot.name} found`,
      bot
    };
  },

  // Update ServantBot status (for real-time simulation)
  async updateBotStatus(id: string, status: ServantBot['status']) {
    const botIndex = this.records.findIndex((bot) => bot.id === id);

    if (botIndex === -1) {
      return {
        success: false,
        message: `ServantBot with ID ${id} not found`
      };
    }

    this.records[botIndex] = {
      ...this.records[botIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      message: `ServantBot status updated to ${status}`,
      bot: this.records[botIndex]
    };
  },

  // Simulate real-time updates
  simulateRealTimeUpdates() {
    setInterval(() => {
      // Randomly update some bot statuses
      const activeBots = this.records.filter((bot) => bot.status === 'active');

      activeBots.forEach((bot) => {
        // Randomly decrease battery
        if (Math.random() > 0.7) {
          bot.batteryLevel = Math.max(
            0,
            bot.batteryLevel - faker.number.int({ min: 1, max: 5 })
          );
        }

        // Update tasks completed
        if (Math.random() > 0.8) {
          bot.tasksCompleted += 1;
        }

        // Change status if battery is low
        if (bot.batteryLevel < 20 && bot.status !== 'charging') {
          bot.status = 'charging';
          bot.currentTask = null;
        }
      });
    }, 5000); // Update every 5 seconds
  }
};

// Initialize sample ServantBots
fakeServantBots.initialize();

function matchSorter(
  bots: ServantBot[],
  search: string,
  arg2: { keys: string[] }
): ServantBot[] {
  throw new Error('Function not implemented.');
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
// Optional: Start real-time simulation
// fakeServantBots.simulateRealTimeUpdates();
