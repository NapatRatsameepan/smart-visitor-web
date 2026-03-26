export interface Region {
  id: string;
  name: string;
  nameEn: string;
}

export interface Province {
  id: string;
  name: string;
  nameEn: string;
  regionId: string;
}

export interface Factory {
  id: string;
  name: string;
  nameEn: string;
  provinceId: string;
  lat: number;
  lng: number;
  abbr: string;
  color: string;
  logoUrl: string;
}

export const regions: Region[] = [
  { id: '1', name: 'ภาคกลาง', nameEn: 'Central' },
  { id: '2', name: 'ภาคตะวันออก', nameEn: 'Eastern' },
  { id: '3', name: 'ภาคเหนือ', nameEn: 'Northern' },
  { id: '4', name: 'ภาคใต้', nameEn: 'Southern' },
  { id: '5', name: 'ภาคตะวันออกเฉียงเหนือ', nameEn: 'Northeastern' },
];

export const provinces: Province[] = [
  { id: '1', name: 'กรุงเทพมหานคร', nameEn: 'Bangkok', regionId: '1' },
  { id: '2', name: 'สมุทรปราการ', nameEn: 'Samut Prakan', regionId: '1' },
  { id: '3', name: 'ปทุมธานี', nameEn: 'Pathum Thani', regionId: '1' },
  { id: '4', name: 'ชลบุรี', nameEn: 'Chonburi', regionId: '2' },
  { id: '5', name: 'ระยอง', nameEn: 'Rayong', regionId: '2' },
  { id: '6', name: 'เชียงใหม่', nameEn: 'Chiang Mai', regionId: '3' },
  { id: '7', name: 'ลำพูน', nameEn: 'Lamphun', regionId: '3' },
  { id: '8', name: 'สงขลา', nameEn: 'Songkhla', regionId: '4' },
  { id: '9', name: 'สุราษฎร์ธานี', nameEn: 'Surat Thani', regionId: '4' },
  { id: '10', name: 'นครราชสีมา', nameEn: 'Nakhon Ratchasima', regionId: '5' },
  { id: '11', name: 'ขอนแก่น', nameEn: 'Khon Kaen', regionId: '5' },
];

export const factories: Factory[] = [
  // Central
  { id: '1', name: 'SCG เคมิคอลส์ กรุงเทพฯ', nameEn: 'SCG Chemicals Bangkok', provinceId: '1', lat: 13.7563, lng: 100.5018, abbr: 'SCG', color: '#3b82f6', logoUrl: 'https://www.google.com/s2/favicons?domain=scg.com&sz=128' },
  { id: '2', name: 'โตโยต้า มอเตอร์ สมุทรปราการ', nameEn: 'Toyota Motor Samut Prakan', provinceId: '2', lat: 13.5990, lng: 100.5998, abbr: 'TYT', color: '#10b981', logoUrl: 'https://www.google.com/s2/favicons?domain=toyota.com&sz=128' },
  { id: '3', name: 'ฮอนด้า ออโตโมบิล ปทุมธานี', nameEn: 'Honda Automobile Pathum Thani', provinceId: '3', lat: 14.0208, lng: 100.5250, abbr: 'HND', color: '#8b5cf6', logoUrl: 'https://www.google.com/s2/favicons?domain=honda.com&sz=128' },
  // Eastern
  { id: '4', name: 'บีเอ็มดับเบิลยู แมนูแฟคเจอริ่ง ชลบุรี', nameEn: 'BMW Manufacturing Chonburi', provinceId: '4', lat: 13.3611, lng: 100.9847, abbr: 'BMW', color: '#f59e0b', logoUrl: 'https://www.google.com/s2/favicons?domain=bmw.com&sz=128' },
  { id: '5', name: 'ปตท. โกลบอล เคมิคอล ระยอง', nameEn: 'PTT Global Chemical Rayong', provinceId: '5', lat: 12.6814, lng: 101.2816, abbr: 'PTT', color: '#ef4444', logoUrl: 'https://www.google.com/s2/favicons?domain=shell.com&sz=128' },
  { id: '6', name: 'แซมซุง อิเล็กทรอนิกส์ ระยอง', nameEn: 'Samsung Electronics Rayong', provinceId: '5', lat: 12.7100, lng: 101.3200, abbr: 'SSG', color: '#ec4899', logoUrl: 'https://www.google.com/s2/favicons?domain=samsung.com&sz=128' },
  // Northern
  { id: '7', name: 'ซีพี ออลล์ เชียงใหม่', nameEn: 'CP All Chiang Mai', provinceId: '6', lat: 18.7883, lng: 98.9853, abbr: 'CP', color: '#06b6d4', logoUrl: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=128' },
  { id: '8', name: 'ฮานา ไมโครอิเล็กทรอนิกส์ ลำพูน', nameEn: 'Hana Microelectronics Lamphun', provinceId: '7', lat: 18.5744, lng: 99.0087, abbr: 'HNM', color: '#84cc16', logoUrl: 'https://www.google.com/s2/favicons?domain=apple.com&sz=128' },
  // Southern
  { id: '9', name: 'ไทยยูเนี่ยน กรุ๊ป สงขลา', nameEn: 'Thai Union Group Songkhla', provinceId: '8', lat: 7.1896, lng: 100.5945, abbr: 'TU', color: '#14b8a6', logoUrl: 'https://www.google.com/s2/favicons?domain=amazon.com&sz=128' },
  { id: '10', name: 'เชฟรอน สุราษฎร์ธานี', nameEn: 'Chevron Surat Thani', provinceId: '9', lat: 9.1382, lng: 99.3217, abbr: 'CVX', color: '#6366f1', logoUrl: 'https://www.google.com/s2/favicons?domain=chevron.com&sz=128' },
  // Northeastern
  { id: '11', name: 'ซีพีเอฟ นครราชสีมา', nameEn: 'CPF Nakhon Ratchasima', provinceId: '10', lat: 14.9798, lng: 102.0978, abbr: 'CPF', color: '#d946ef', logoUrl: 'https://www.google.com/s2/favicons?domain=nvidia.com&sz=128' },
  { id: '12', name: 'มิตรผล ขอนแก่น', nameEn: 'Mitr Phol Khon Kaen', provinceId: '11', lat: 16.4419, lng: 102.8360, abbr: 'MPL', color: '#f97316', logoUrl: 'https://www.google.com/s2/favicons?domain=google.com&sz=128' },
];

// Helper: get provinces by region
export function getProvincesByRegion(regionId: string | null): Province[] {
  if (!regionId) return provinces;
  return provinces.filter((p) => p.regionId === regionId);
}

// Helper: get factories by province
export function getFactoriesByProvince(provinceId: string | null): Factory[] {
  if (!provinceId) return factories;
  return factories.filter((f) => f.provinceId === provinceId);
}

// Helper: get factories by region
export function getFactoriesByRegion(regionId: string | null): Factory[] {
  if (!regionId) return factories;
  const regionProvinceIds = provinces.filter((p) => p.regionId === regionId).map((p) => p.id);
  return factories.filter((f) => regionProvinceIds.includes(f.provinceId));
}

// Helper: get filtered factories based on current filter state
export function getFilteredFactories(
  regionId: string | null,
  provinceId: string | null,
  factoryId: string | null
): Factory[] {
  if (factoryId) {
    return factories.filter((f) => f.id === factoryId);
  }
  if (provinceId) {
    return getFactoriesByProvince(provinceId);
  }
  if (regionId) {
    return getFactoriesByRegion(regionId);
  }
  return factories;
}
