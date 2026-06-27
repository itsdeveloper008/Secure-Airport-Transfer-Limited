/**
 * Simplified Great Britain outline — stylised vector, geographically recognisable.
 * viewBox: 0 0 400 620
 */
export const UK_MAINLAND_PATH = `
  M 168 58
  C 192 48, 218 52, 232 68
  C 246 84, 248 102, 238 118
  C 228 134, 238 148, 252 158
  C 266 168, 272 182, 268 198
  C 264 214, 258 228, 262 244
  C 266 260, 258 276, 248 290
  C 238 304, 242 320, 248 336
  C 254 352, 248 368, 236 382
  C 224 396, 218 412, 208 428
  C 198 444, 188 458, 172 468
  C 156 478, 142 482, 128 476
  C 114 470, 108 456, 102 440
  C 96 424, 88 408, 82 392
  C 76 376, 72 358, 74 340
  C 76 322, 80 304, 86 288
  C 92 272, 88 256, 84 240
  C 80 224, 78 208, 82 192
  C 86 176, 94 162, 104 150
  C 114 138, 122 124, 132 112
  C 142 100, 148 86, 158 74
  C 162 66, 165 60, 168 58
  Z
`;

/** Wales western peninsula detail */
export const UK_WALES_PATH = `
  M 82 292
  C 72 298, 64 312, 68 328
  C 72 344, 84 352, 96 346
  C 102 340, 98 324, 94 308
  C 90 298, 86 292, 82 292
  Z
`;

export interface AirportHub {
  code: string;
  name: string;
  cx: number;
  cy: number;
  /** External label position for crowded clusters */
  labelX?: number;
  labelY?: number;
  cluster?: 'london';
}

export const AIRPORT_HUBS: AirportHub[] = [
  { code: 'EDI', name: 'Edinburgh', cx: 198, cy: 108 },
  { code: 'GLA', name: 'Glasgow', cx: 168, cy: 128 },
  { code: 'MAN', name: 'Manchester', cx: 198, cy: 268 },
  { code: 'LBA', name: 'Leeds Bradford', cx: 218, cy: 248 },
  { code: 'LPL', name: 'Liverpool', cx: 178, cy: 278 },
  { code: 'BHX', name: 'Birmingham', cx: 212, cy: 318 },
  { code: 'LHR', name: 'Heathrow', cx: 228, cy: 398, cluster: 'london' },
  { code: 'LGW', name: 'Gatwick', cx: 238, cy: 418, cluster: 'london' },
  { code: 'LCY', name: 'London City', cx: 248, cy: 402, cluster: 'london' },
  { code: 'STN', name: 'Stansted', cx: 252, cy: 382, cluster: 'london' },
  { code: 'LTN', name: 'Luton', cx: 232, cy: 378, cluster: 'london' },
];

/** London cluster callout labels — positioned outside the cluster */
export const LONDON_CALLOUTS = [
  { code: 'LHR', labelX: 290, labelY: 392 },
  { code: 'LGW', labelX: 300, labelY: 422 },
  { code: 'LCY', labelX: 310, labelY: 402 },
  { code: 'STN', labelX: 318, labelY: 378 },
  { code: 'LTN', labelX: 278, labelY: 362 },
];

/** Primary operational spine: Scotland → Manchester → Birmingham → London */
export const NETWORK_SPINE: [string, string][] = [
  ['EDI', 'MAN'],
  ['GLA', 'MAN'],
  ['MAN', 'BHX'],
  ['BHX', 'LHR'],
];

export const NETWORK_BRANCHES: [string, string][] = [
  ['MAN', 'LPL'],
  ['MAN', 'LBA'],
  ['LHR', 'LGW'],
  ['LHR', 'STN'],
  ['LHR', 'LTN'],
  ['LHR', 'LCY'],
];

export const NETWORK_STATS = [
  { value: '12+', label: 'Airport Hubs' },
  { value: '500+', label: 'Fleet Partners' },
  { value: '24/7', label: 'Operations' },
  { value: '100%', label: 'Corporate Focus' },
];

export function getHub(code: string): AirportHub | undefined {
  return AIRPORT_HUBS.find((h) => h.code === code);
}

export const COMPANY_LEGAL =
  'SECURE AIRPORT TRANSFER LIMITED is a private limited company registered in England and Wales. Company Registration Number: 15018607. Registered Office: Apex House 2nd Floor, Office 2a, Grand Arcade, North Finchley, London, England, N12 0EH.';
