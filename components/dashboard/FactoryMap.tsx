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
        {filteredFactories.map((factory) => (
          <Marker key={factory.id} position={[factory.lat, factory.lng]}>
            <Popup>
              <div className="text-sm font-semibold">
                {isTH ? factory.name : factory.nameEn}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
