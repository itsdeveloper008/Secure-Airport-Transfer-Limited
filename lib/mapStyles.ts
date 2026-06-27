/** Custom dark map styling — matches SATL brand */
export const darkMapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#071A35' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#071A35' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9CA3AF' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1e3a5f' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#B8C5D6' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#374151' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#2d3748' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#4B5563' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1628' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4B5563' }] },
];

export interface AirportLocation {
  code: string;
  name: string;
  lat: number;
  lng: number;
  features: string[];
}

export const UK_AIRPORTS: AirportLocation[] = [
  {
    code: 'LHR',
    name: 'Heathrow Airport',
    lat: 51.47,
    lng: -0.4543,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'LGW',
    name: 'Gatwick Airport',
    lat: 51.1537,
    lng: -0.1821,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'STN',
    name: 'Stansted Airport',
    lat: 51.886,
    lng: 0.2389,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'LTN',
    name: 'Luton Airport',
    lat: 51.8747,
    lng: -0.3683,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'LCY',
    name: 'London City Airport',
    lat: 51.5053,
    lng: 0.0553,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'MAN',
    name: 'Manchester Airport',
    lat: 53.3537,
    lng: -2.275,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'BHX',
    name: 'Birmingham Airport',
    lat: 52.4539,
    lng: -1.748,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'LBA',
    name: 'Leeds Bradford Airport',
    lat: 53.8659,
    lng: -1.6606,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'LPL',
    name: 'Liverpool Airport',
    lat: 53.3336,
    lng: -2.8497,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'EDI',
    name: 'Edinburgh Airport',
    lat: 55.9508,
    lng: -3.3615,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
  {
    code: 'GLA',
    name: 'Glasgow Airport',
    lat: 55.8642,
    lng: -4.4331,
    features: ['Executive Transfers Available', 'Corporate Accounts Supported', '24/7 Operations', 'Premium Fleet Access'],
  },
];

export const MAP_CENTER = { lat: 54.2, lng: -2.5 };
export const MAP_ZOOM = 6;
