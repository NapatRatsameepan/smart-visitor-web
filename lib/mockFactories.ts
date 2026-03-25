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
  { id: '1', name: 'โรงงาน กรุงเทพ A', nameEn: 'Bangkok Factory A', provinceId: '1', lat: 13.7563, lng: 100.5018 },
  { id: '2', name: 'โรงงาน สมุทรปราการ', nameEn: 'Samut Prakan Factory', provinceId: '2', lat: 13.5990, lng: 100.5998 },
  { id: '3', name: 'โรงงาน ปทุมธานี', nameEn: 'Pathum Thani Factory', provinceId: '3', lat: 14.0208, lng: 100.5250 },
  // Eastern
  { id: '4', name: 'โรงงาน ชลบุรี', nameEn: 'Chonburi Factory', provinceId: '4', lat: 13.3611, lng: 100.9847 },
  { id: '5', name: 'โรงงาน ระยอง A', nameEn: 'Rayong Factory A', provinceId: '5', lat: 12.6814, lng: 101.2816 },
  { id: '6', name: 'โรงงาน ระยอง B', nameEn: 'Rayong Factory B', provinceId: '5', lat: 12.7100, lng: 101.3200 },
  // Northern
  { id: '7', name: 'โรงงาน เชียงใหม่', nameEn: 'Chiang Mai Factory', provinceId: '6', lat: 18.7883, lng: 98.9853 },
  { id: '8', name: 'โรงงาน ลำพูน', nameEn: 'Lamphun Factory', provinceId: '7', lat: 18.5744, lng: 99.0087 },
  // Southern
  { id: '9', name: 'โรงงาน สงขลา', nameEn: 'Songkhla Factory', provinceId: '8', lat: 7.1896, lng: 100.5945 },
  { id: '10', name: 'โรงงาน สุราษฎร์ธานี', nameEn: 'Surat Thani Factory', provinceId: '9', lat: 9.1382, lng: 99.3217 },
  // Northeastern
  { id: '11', name: 'โรงงาน นครราชสีมา', nameEn: 'Nakhon Ratchasima Factory', provinceId: '10', lat: 14.9798, lng: 102.0978 },
  { id: '12', name: 'โรงงาน ขอนแก่น', nameEn: 'Khon Kaen Factory', provinceId: '11', lat: 16.4419, lng: 102.8360 },
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
