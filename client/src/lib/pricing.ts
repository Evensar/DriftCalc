export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  maxQuantity?: number;
}

export const services: ServiceItem[] = [
  // Physical Servers
  {
    id: 'placement',
    name: 'Serverplacering',
    description: '2 280 kr/U och år',
    price: 2280,
    unit: 'U',
    category: 'physical'
  },
  {
    id: 'monitoring-license',
    name: 'Övervakning licens + infrastruktur',
    description: '1 000 kr/server och år',
    price: 1000,
    unit: 'server',
    category: 'physical'
  },
  {
    id: 'monitoring-action',
    name: 'Övervakning inkl. åtgärd',
    description: '6 600 kr/server och år',
    price: 6600,
    unit: 'server',
    category: 'physical'
  },
  {
    id: 'rack-service',
    name: 'Drifttjänst rackserver',
    description: '19 800 kr/server och år',
    price: 19800,
    unit: 'server',
    category: 'physical'
  },
  
  // Virtual Servers
  {
    id: 'base-server',
    name: 'Server med drift och underhåll',
    description: '(1 VCPU, 2 GB RAM, 60 GB lagring)\n9 650 kr/server/år',
    price: 9650,
    unit: 'server',
    category: 'virtual'
  },
  {
    id: 'extra-cpu',
    name: 'Extra processor (VCPU)',
    description: '500 kr/st./år',
    price: 500,
    unit: 'st',
    category: 'virtual'
  },
  {
    id: 'extra-ram',
    name: 'Extra ramminne per GB',
    description: '325 kr/GB/år',
    price: 325,
    unit: 'GB',
    category: 'virtual'
  },
  {
    id: 'extra-storage',
    name: 'Extra serverlagring per GB',
    description: '125 kr/GB/år',
    price: 125,
    unit: 'GB',
    category: 'virtual'
  },
  
  // Storage
  {
    id: 'work-files',
    name: 'Fillagring arbetsmaterial (hemkatalog)',
    description: '33 kr/GB och år',
    price: 33,
    unit: 'GB',
    category: 'storage'
  },
  {
    id: 'student-files',
    name: 'Fillagring studentmaterial',
    description: '24 kr/GB och år',
    price: 24,
    unit: 'GB',
    category: 'storage'
  },
  {
    id: 'longterm',
    name: 'Långtidslagring',
    description: '12 kr/GB och år',
    price: 12,
    unit: 'GB',
    category: 'storage'
  },
  {
    id: 'tape-backup',
    name: 'Backup på band',
    description: '3,60 kr/GB och år',
    price: 3.6,
    unit: 'GB',
    category: 'storage'
  },
  
  // Database Hosting
  {
    id: 'mssql',
    name: 'MSSQL inkl. 1 GB lagring',
    description: '6 000 kr/databas och år',
    price: 6000,
    unit: 'databas',
    category: 'database'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL inkl. 1 GB lagring',
    description: '4 000 kr/databas och år',
    price: 4000,
    unit: 'databas',
    category: 'database'
  },
  {
    id: 'mongodb',
    name: 'MongoDB inkl. 1 GB lagring',
    description: '4 000 kr/databas och år',
    price: 4000,
    unit: 'databas',
    category: 'database'
  },
  {
    id: 'mariadb',
    name: 'MariaDB',
    description: '4 000 kr/databas och år',
    price: 4000,
    unit: 'databas',
    category: 'database'
  },
  {
    id: 'db-extra-storage',
    name: 'Lagring utöver 1 GB',
    description: '300 kr/GB och år',
    price: 300,
    unit: 'GB',
    category: 'database'
  },
  
  // Web Hosting
  {
    id: 'web-hosting',
    name: 'IIS & Apache < 1GB',
    description: '3 600 kr/sajt och år',
    price: 3600,
    unit: 'sajt',
    category: 'web'
  },
  {
    id: 'sharepoint',
    name: 'SharePoint lagring > 10GB',
    description: '300 kr/GB och år',
    price: 300,
    unit: 'GB',
    category: 'web'
  },
  
  // Backup Services
  {
    id: 'first-system',
    name: 'Beredskap 1:a systemet',
    description: '30 000 kr/system och år',
    price: 30000,
    unit: 'system',
    category: 'backup',
    maxQuantity: 1
  },
  {
    id: 'additional-systems',
    name: 'Beredskap ytterligare system',
    description: '10 000 kr/system och år',
    price: 10000,
    unit: 'system',
    category: 'backup'
  }
];

export const categoryLabels: Record<string, string> = {
  physical: 'Fysiska servrar',
  virtual: 'Virtuella servrar',
  storage: 'Lagring',
  database: 'Databashotell',
  web: 'Webbhotell',
  backup: 'Beredskap'
};

export const categoryIcons: Record<string, string> = {
  physical: 'fas fa-server',
  virtual: 'fas fa-cloud',
  storage: 'fas fa-database',
  database: 'fas fa-server',
  web: 'fas fa-globe',
  backup: 'fas fa-shield-alt'
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('SEK', 'kr');
}
