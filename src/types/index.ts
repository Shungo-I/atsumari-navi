// ピンの位置情報
export interface PinLocation {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

// ユーザー情報
export interface User {
  id: string;
  name: string;
  color: string; // ピンの色を識別するため
}

// 中間地点の計算結果
export interface CenterPoint {
  lat: number;
  lng: number;
  radius: number; // すべてのピンを含む最小半径
}

// アプリケーションの状態
export interface AppState {
  users: User[];
  pins: PinLocation[];
  centerPoint: CenterPoint | null;
  currentUser: User | null;
}
