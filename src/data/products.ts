export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'inverters' | 'batteries' | 'all-in-one';
  categoryLabel: string;
  tagline: string;
  highlight: string;
  warranty: string;
  image: string;
  fallbackImage: string;
  keySpecs: {
    powerOrCapacity: string;
    voltage: string;
    scalability: string;
  };
  detailedSpecs: ProductSpec[];
}

export const productCategories = [
  { id: 'all', label: 'All Products' },
  { id: 'inverters', label: 'Hybrid Inverters' },
  { id: 'batteries', label: 'LiFePO4 Batteries' },
  { id: 'all-in-one', label: 'All-in-One Systems' },
] as const;

export const productsData: Product[] = [
  // 1. Inverters
  {
    id: '24v-4kw-hybrid-inverter',
    name: '24V 4KW Single Phase Hybrid Inverter',
    category: 'inverters',
    categoryLabel: 'Hybrid Inverter',
    tagline: 'High-efficiency solar hybrid inverter engineered for resilient residential and commercial off-grid loads.',
    highlight: 'Parallel up to 9 units',
    warranty: '5 Years',
    image: '/products/24v-4kw-hybrid-inverter.webp',
    fallbackImage: '/products/24v-4kw-hybrid-inverter.png',
    keySpecs: {
      powerOrCapacity: '4.0 kW',
      voltage: '208–240 VAC',
      scalability: 'Up to 9 units in parallel',
    },
    detailedSpecs: [
      { label: 'Max Power', value: '4 kW' },
      { label: 'Phase', value: 'Single Phase' },
      { label: 'Rated Input Voltage', value: '208 / 220 / 230 / 240 VAC; L+N+PE' },
      { label: 'Frequency', value: '50 / 60 Hz (Auto-Adaptive)' },
      { label: 'Parallel Scalability', value: 'Parallel up to 9 units' },
      { label: 'Warranty', value: '5 Years' },
    ],
  },
  {
    id: '48v-6-5kw-hybrid-inverter',
    name: '48V 6.5KW Single Phase Hybrid Inverter',
    category: 'inverters',
    categoryLabel: 'Hybrid Inverter',
    tagline: 'Utility-grade 48V hybrid inverter delivering high surge capacity and multi-unit cluster scalability.',
    highlight: 'Up to 9 units (54 kW cluster)',
    warranty: '5 Years',
    image: '/products/48v-6-5kw-hybrid-inverter.webp',
    fallbackImage: '/products/48v-6-5kw-hybrid-inverter.png',
    keySpecs: {
      powerOrCapacity: '6.5 kW',
      voltage: '208–240 VAC',
      scalability: 'Up to 9 units (54 kW)',
    },
    detailedSpecs: [
      { label: 'Max Power', value: '6.5 kW' },
      { label: 'Phase', value: 'Single Phase' },
      { label: 'Rated Input Voltage', value: '208 / 220 / 230 / 240 VAC; L+N+PE' },
      { label: 'Frequency', value: '50 / 60 Hz (Auto-Adaptive)' },
      { label: 'Max Parallel Quantity', value: '9 units (54 kW capacity)' },
      { label: 'Warranty', value: '5 Years' },
    ],
  },

  // 2. LiFePO4 Energy Storage
  {
    id: '24v-250ah-lifepo4-battery',
    name: '24V 250Ah LiFePO4 Battery',
    category: 'batteries',
    categoryLabel: 'LiFePO4 Battery',
    tagline: 'Premium Lithium Iron Phosphate energy storage delivering 6.40 kWh of high-safety cycle stability.',
    highlight: '6.40 kWh Electricity',
    warranty: '10 Years',
    image: '/products/24v-250ah-lifepo4-battery.webp',
    fallbackImage: '/products/24v-250ah-lifepo4-battery.png',
    keySpecs: {
      powerOrCapacity: '6.40 kWh',
      voltage: '24V (25.6V)',
      scalability: '200Ah Nominal',
    },
    detailedSpecs: [
      { label: 'Electricity (Energy)', value: '6.40 kWh' },
      { label: 'Nominal Capacity', value: '200 Ah' },
      { label: 'Nominal Voltage', value: '24V (25.6V)' },
      { label: 'Battery Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'Warranty', value: '10 Years' },
    ],
  },
  {
    id: '24v-300ah-lifepo4-battery',
    name: '24V 300Ah LiFePO4 Battery',
    category: 'batteries',
    categoryLabel: 'LiFePO4 Battery',
    tagline: 'Extended-capacity 7.68 kWh storage unit engineered for demanding daily cycling and solar integration.',
    highlight: '7.68 kWh Electricity',
    warranty: '10 Years',
    image: '/products/24v-300ah-lifepo4-battery.webp',
    fallbackImage: '/products/24v-300ah-lifepo4-battery.png',
    keySpecs: {
      powerOrCapacity: '7.68 kWh',
      voltage: '24V (25.6V)',
      scalability: '250Ah Nominal',
    },
    detailedSpecs: [
      { label: 'Electricity (Energy)', value: '7.68 kWh' },
      { label: 'Nominal Capacity', value: '250 Ah' },
      { label: 'Nominal Voltage', value: '24V (25.6V)' },
      { label: 'Battery Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'Warranty', value: '10 Years' },
    ],
  },
  {
    id: '51-2v-100ah-lifepo4-battery',
    name: '51.2V / 100Ah LiFePO4 Battery',
    category: 'batteries',
    categoryLabel: 'LiFePO4 Battery',
    tagline: 'High-voltage rack/wall-mount battery with ultra-low monthly self-discharge and 5.12 kWh capacity.',
    highlight: '<3%/month self-discharge',
    warranty: '10 Years',
    image: '/products/51-2v-100ah-lifepo4-battery.webp',
    fallbackImage: '/products/51-2v-100ah-lifepo4-battery.png',
    keySpecs: {
      powerOrCapacity: '5.12 kWh',
      voltage: '48V (51.2V)',
      scalability: '100Ah Nominal',
    },
    detailedSpecs: [
      { label: 'Electricity (Energy)', value: '5.12 kWh' },
      { label: 'Nominal Capacity', value: '100 Ah' },
      { label: 'Nominal Voltage', value: '48V (51.2V)' },
      { label: 'Self-discharge (25°C)', value: '< 3% / month' },
      { label: 'Battery Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'Warranty', value: '10 Years' },
    ],
  },
  {
    id: '48v-200ah-lifepo4-battery',
    name: '48V / 200Ah LiFePO4 Battery',
    category: 'batteries',
    categoryLabel: 'LiFePO4 Battery',
    tagline: 'High-capacity 10.24 kWh energy storage tower for continuous commercial power continuity.',
    highlight: '10.24 kWh Electricity',
    warranty: '10 Years',
    image: '/products/48v-200ah-lifepo4-battery.webp',
    fallbackImage: '/products/48v-200ah-lifepo4-battery.png',
    keySpecs: {
      powerOrCapacity: '10.24 kWh',
      voltage: '48V (51.2V)',
      scalability: '200Ah Nominal',
    },
    detailedSpecs: [
      { label: 'Electricity (Energy)', value: '10.24 kWh' },
      { label: 'Nominal Capacity', value: '200 Ah' },
      { label: 'Nominal Voltage', value: '48V (51.2V)' },
      { label: 'Battery Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'Warranty', value: '10 Years' },
    ],
  },
  {
    id: '48v-300ah-lifepo4-battery',
    name: '48V / 300Ah LiFePO4 Battery',
    category: 'batteries',
    categoryLabel: 'LiFePO4 Battery',
    tagline: 'Heavy-duty 15.36 kWh industrial storage block providing maximum runtime and cycle durability.',
    highlight: '15.36 kWh Electricity',
    warranty: '10 Years',
    image: '/products/48v-300ah-lifepo4-battery.webp',
    fallbackImage: '/products/48v-300ah-lifepo4-battery.png',
    keySpecs: {
      powerOrCapacity: '15.36 kWh',
      voltage: '48V (51.2V)',
      scalability: '300Ah Nominal',
    },
    detailedSpecs: [
      { label: 'Electricity (Energy)', value: '15.36 kWh' },
      { label: 'Nominal Capacity', value: '300 Ah' },
      { label: 'Nominal Voltage', value: '48V (51.2V)' },
      { label: 'Battery Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'Warranty', value: '10 Years' },
    ],
  },

  // 3. All-in-One Solar ESS
  {
    id: 'all-in-one-6kw-15kwh-ess',
    name: 'All-in-One 6KW / 15KWh Solar ESS',
    category: 'all-in-one',
    categoryLabel: 'All-in-One ESS',
    tagline: 'Fully integrated solar generator combining a 6kW MPPT inverter with 15.36 kWh expandable storage.',
    highlight: 'Parallel up to 9 groups',
    warranty: '10 Yr Battery / 5 Yr Inverter',
    image: '/products/all-in-one-6kw-15kwh-ess.webp',
    fallbackImage: '/products/all-in-one-6kw-15kwh-ess.png',
    keySpecs: {
      powerOrCapacity: '6 kW / 15.36 kWh',
      voltage: '220V Single Phase',
      scalability: 'Parallel up to 9 groups',
    },
    detailedSpecs: [
      { label: 'Inverter Max Power', value: '6 kW' },
      { label: 'Battery Electricity', value: '15 kWh (15.36 kWh)' },
      { label: 'Battery Capacity / Voltage', value: '300Ah / 48V (51.2V)' },
      { label: 'Output Voltage', value: '208 / 220 / 230 / 240 VAC' },
      { label: 'Frequency', value: '50 / 60 Hz (Auto-Adaptive)' },
      { label: 'Solar Charger Type', value: 'MPPT (18A / 6000W Max PV Input)' },
      { label: 'System Scalability', value: 'Parallel up to 9 groups' },
      { label: 'Battery Expandability', value: 'Expandable according to demand' },
      { label: 'Battery Warranty', value: '10 Years' },
      { label: 'Inverter Warranty', value: '5 Years' },
    ],
  },
  {
    id: 'all-in-one-12kw-30kwh-ess',
    name: 'All-in-One 12KW / 30KWh Solar ESS',
    category: 'all-in-one',
    categoryLabel: 'All-in-One ESS',
    tagline: 'Flagship commercial energy station featuring dual 6000W MPPT inputs and 30.72 kWh expandable capacity.',
    highlight: 'Dual MPPT (12000W) · 4 Groups',
    warranty: '10 Yr Battery / 5 Yr Inverter',
    image: '/products/all-in-one-12kw-30kwh-ess.webp',
    fallbackImage: '/products/all-in-one-12kw-30kwh-ess.png',
    keySpecs: {
      powerOrCapacity: '12 kW / 30.72 kWh',
      voltage: '220V Single Phase',
      scalability: 'Parallel up to 4 groups',
    },
    detailedSpecs: [
      { label: 'Inverter Max Power', value: '12 kW' },
      { label: 'Battery Electricity', value: '30 kWh (30.72 kWh)' },
      { label: 'Battery Capacity / Voltage', value: '600Ah / 48V (51.2V)' },
      { label: 'Output Voltage', value: '208 / 220 / 230 / 240 VAC' },
      { label: 'Frequency', value: '50 / 60 Hz (Auto-Adaptive)' },
      { label: 'Solar Charger Type', value: 'Dual MPPT (18A / 6000W * 2)' },
      { label: 'System Scalability', value: 'Parallel up to 4 groups' },
      { label: 'Battery Expandability', value: 'Expandable according to demand' },
      { label: 'Battery Warranty', value: '10 Years' },
      { label: 'Inverter Warranty', value: '5 Years' },
    ],
  },
];
