import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PinLocation, CenterPoint } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 地球の半径（キロメートル）
const EARTH_RADIUS_KM = 6371;

// 度をラジアンに変換
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// 2点間の距離を計算（ハーバーサイン公式）
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

// 複数のピンの中間地点を計算
export function calculateCenterPoint(pins: PinLocation[]): CenterPoint | null {
  if (pins.length === 0) return null;
  
  if (pins.length === 1) {
    return {
      lat: pins[0].lat,
      lng: pins[0].lng,
      radius: 0
    };
  }

  // 重心を計算
  const centerLat = pins.reduce((sum, pin) => sum + pin.lat, 0) / pins.length;
  const centerLng = pins.reduce((sum, pin) => sum + pin.lng, 0) / pins.length;

  // 中心点から最も遠いピンまでの距離を計算
  const maxDistance = Math.max(
    ...pins.map(pin => calculateDistance(centerLat, centerLng, pin.lat, pin.lng))
  );

  return {
    lat: centerLat,
    lng: centerLng,
    radius: maxDistance
  };
}

// ランダムな色を生成
export function generateRandomColor(): string {
  const colors = [
    "#ef4444", // red
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f97316", // orange
    "#84cc16", // lime
    "#ec4899", // pink
    "#6b7280", // gray
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
