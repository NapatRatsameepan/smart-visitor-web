"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useDashboardFilterStore } from "@/store/useDashboardFilterStore"
import { getFilteredFactories, Factory } from "@/lib/mockFactories"
import { useLanguageStore } from "@/store/useLanguageStore"

// Fix default marker icon for Leaflet in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

// Thailand default bounds
const THAILAND_CENTER: [number, number] = [13.0, 101.0]
const THAILAND_ZOOM = 6

// Component to handle map fly-to based on filtered factories
function MapController({ filteredFactories }: { filteredFactories: Factory[] }) {
  const map = useMap()

  useEffect(() => {
    if (filteredFactories.length === 0) {
      map.setView(THAILAND_CENTER, THAILAND_ZOOM)
      return
    }

    if (filteredFactories.length === 1) {
      map.flyTo([filteredFactories[0].lat, filteredFactories[0].lng], 13, { duration: 1 })
      return
    }

    const bounds = L.latLngBounds(
      filteredFactories.map((f) => [f.lat, f.lng] as [number, number])
    )
    map.flyToBounds(bounds.pad(0.3), { duration: 1 })
  }, [filteredFactories, map])

  return null
}

export default function FactoryMap() {
  const { isTH } = useLanguageStore()
  const { selectedRegion, selectedProvince, selectedFactory } = useDashboardFilterStore()

  const filteredFactories = useMemo(
    () => getFilteredFactories(selectedRegion, selectedProvince, selectedFactory),
    [selectedRegion, selectedProvince, selectedFactory]
  )

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative z-0" style={{ minHeight: "300px" }}>
      <MapContainer
        center={THAILAND_CENTER}
        zoom={THAILAND_ZOOM}
        className="w-full h-full"
        style={{ minHeight: "300px", borderRadius: "1rem" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController filteredFactories={filteredFactories} />
        {filteredFactories.map((factory) => {
          const customIcon = L.divIcon({
            className: 'custom-factory-marker',
            html: `
              <div style="width: 44px; height: 44px; background-color: white; border-radius: 50%; border: 3px solid ${factory.color}; box-shadow: 0 4px 10px rgba(0,0,0,0.2); overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
                <img src="${factory.logoUrl}" alt="${factory.abbr}" style="width: 100%; height: 100%; object-fit: contain; padding: 4px; background-color: white;" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${factory.abbr}&background=${factory.color.replace('#','')}&color=fff';" />
              </div>
            `,
            iconSize: [44, 44],
            iconAnchor: [22, 22],
            popupAnchor: [0, -22]
          });

          return (
            <Marker 
              key={factory.id} 
              position={[factory.lat, factory.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="flex flex-col gap-1 min-w-[120px]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: factory.color }}></div>
                    <strong className="text-sm">{factory.abbr}</strong>
                  </div>
                  <div className="text-sm text-slate-600">
                    {isTH ? factory.name : factory.nameEn}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  )
}
