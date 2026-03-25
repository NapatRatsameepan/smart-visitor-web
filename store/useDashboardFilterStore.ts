import { create } from 'zustand';

interface DashboardFilterState {
  selectedRegion: string | null;
  selectedProvince: string | null;
  selectedFactory: string | null;
  setRegion: (regionId: string | null) => void;
  setProvince: (provinceId: string | null) => void;
  setFactory: (factoryId: string | null) => void;
}

export const useDashboardFilterStore = create<DashboardFilterState>((set) => ({
  selectedRegion: null,
  selectedProvince: null,
  selectedFactory: null,
  setRegion: (regionId) =>
    set({ selectedRegion: regionId, selectedProvince: null, selectedFactory: null }),
  setProvince: (provinceId) =>
    set({ selectedProvince: provinceId, selectedFactory: null }),
  setFactory: (factoryId) =>
    set({ selectedFactory: factoryId }),
}));
