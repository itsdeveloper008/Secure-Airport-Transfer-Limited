'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GoogleMap, useJsApiLoader, Marker as GMarker, InfoWindow } from '@react-google-maps/api';
import {
  UK_AIRPORTS,
  MAP_CENTER,
  MAP_ZOOM,
  darkMapStyles,
  type AirportLocation,
} from '@/lib/mapStyles';

const containerStyle = { width: '100%', height: '100%' };

function buildGoogleMarkerIcon(active: boolean, hovered: boolean): google.maps.Icon | undefined {
  if (typeof google === 'undefined') return undefined;
  const size = hovered || active ? 44 : 36;
  const ring = active || hovered ? '#2563EB' : '#C9A227';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="14" fill="#2563EB" opacity="0.2"/>
    <circle cx="18" cy="18" r="10" fill="none" stroke="${ring}" stroke-width="2.5"/>
    <circle cx="18" cy="18" r="4.5" fill="#2563EB"/>
    <circle cx="18" cy="18" r="2" fill="#C9A227"/>
  </svg>`;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(size, size),
    anchor: new google.maps.Point(size / 2, size / 2),
  };
}

function buildLeafletIcon(active: boolean) {
  const size = active ? 44 : 36;
  const ring = active ? '#2563EB' : '#C9A227';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="14" fill="#2563EB" opacity="0.2"/>
    <circle cx="18" cy="18" r="10" fill="none" stroke="${ring}" stroke-width="2.5"/>
    <circle cx="18" cy="18" r="4.5" fill="#2563EB"/>
    <circle cx="18" cy="18" r="2" fill="#C9A227"/>
  </svg>`;
  return L.divIcon({
    className: '',
    html: svg,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function AirportPopup({ airport }: { airport: AirportLocation }) {
  return (
    <div className="min-w-[220px] font-sans">
      <p className="font-display text-base font-bold text-brand-navy">
        {airport.name} <span className="text-brand-blue">({airport.code})</span>
      </p>
      <ul className="mt-3 space-y-2">
        {airport.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-brand-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-brand-gold px-4 py-2.5 text-xs font-semibold text-brand-navy transition-colors hover:bg-[#d4ad2f]"
      >
        Request Corporate Quote
      </Link>
    </div>
  );
}

function CooperativeScrollZoom({ onScrollWithoutModifier }: { onScrollWithoutModifier?: () => void }) {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable();

    const container = map.getContainer();

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY > 0) {
          map.zoomOut();
        } else if (e.deltaY < 0) {
          map.zoomIn();
        }
      } else {
        onScrollWithoutModifier?.();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [map, onScrollWithoutModifier]);

  return null;
}

function LeafletMapView() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), 2500);
    return () => clearTimeout(timer);
  }, [showHint]);

  const isMac =
    typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[MAP_CENTER.lat, MAP_CENTER.lng]}
        zoom={MAP_ZOOM}
        className="h-full w-full"
        zoomControl
        scrollWheelZoom={false}
      >
        <CooperativeScrollZoom onScrollWithoutModifier={() => setShowHint(true)} />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {UK_AIRPORTS.map((airport) => (
          <Marker
            key={airport.code}
            position={[airport.lat, airport.lng]}
            icon={buildLeafletIcon(selected === airport.code)}
            eventHandlers={{
              click: () => setSelected(airport.code === selected ? null : airport.code),
            }}
          >
            <Popup>
              <AirportPopup airport={airport} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showHint && (
        <div className="pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center bg-black/25">
          <p className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-brand-navy shadow-lg">
            {isMac ? 'Use ⌘ + scroll to zoom the map' : 'Use Ctrl + scroll to zoom the map'}
          </p>
        </div>
      )}
    </div>
  );
}

function GoogleMapView({
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  selected: AirportLocation | null;
  hovered: string | null;
  onSelect: (a: AirportLocation | null) => void;
  onHover: (code: string | null) => void;
}) {
  const options = useMemo(
    () => ({
      styles: darkMapStyles,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      gestureHandling: 'cooperative' as const,
      backgroundColor: '#071A35',
    }),
    []
  );

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      options={options}
    >
      {UK_AIRPORTS.map((airport) => {
        const isActive = selected?.code === airport.code;
        const isHovered = hovered === airport.code;
        const icon = buildGoogleMarkerIcon(isActive, isHovered);
        return (
          <GMarker
            key={airport.code}
            position={{ lat: airport.lat, lng: airport.lng }}
            icon={icon}
            onClick={() => onSelect(airport)}
            onMouseOver={() => onHover(airport.code)}
            onMouseOut={() => onHover(null)}
            zIndex={isActive || isHovered ? 999 : 1}
          />
        );
      })}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => onSelect(null)}
          options={{ pixelOffset: new google.maps.Size(0, -22) }}
        >
          <AirportPopup airport={selected} />
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function MapLoader() {
  return (
    <div className="flex h-[min(60vh,560px)] w-full items-center justify-center bg-brand-navy">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
        <p className="font-accent text-xs uppercase tracking-widest text-white/50">Loading coverage map…</p>
      </div>
    </div>
  );
}

export default function UKCoverageMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
  const [selected, setSelected] = useState<AirportLocation | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || ' ',
    id: 'satl-google-map',
  });

  const useGoogle = Boolean(apiKey && !loadError && isLoaded);

  if (!mounted) return <MapLoader />;

  if (apiKey && !loadError && !isLoaded) return <MapLoader />;

  return (
    <motion.div
      className="h-[min(60vh,560px)] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {useGoogle ? (
        <GoogleMapView
          selected={selected}
          hovered={hovered}
          onSelect={setSelected}
          onHover={setHovered}
        />
      ) : (
        <LeafletMapView />
      )}
    </motion.div>
  );
}
