"use client";

import { PinSidebar } from "@/components/PinSidebar";
import { UserRegistration } from "@/components/UserRegistration";
import { useAtsumariNavi } from "@/hooks/useAtsumariNavi";

export default function Home() {
  const { users, pins, centerPoint, currentUser, registerUser, addPin, removePin } =
    useAtsumariNavi();

  // ユーザーが登録されていない場合は登録画面を表示
  if (!currentUser) {
    return <UserRegistration onRegister={registerUser} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー */}
      <PinSidebar
        pins={pins}
        users={users}
        centerPoint={centerPoint}
        currentUser={currentUser}
        onAddPin={addPin}
        onRemovePin={removePin}
      />

      {/* メインエリア（将来的にマップを表示） */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">マップエリア</h2>
          <p className="text-gray-600 mb-4">ここにGoogle Mapが表示されます</p>
          {centerPoint && (
            <div className="bg-white rounded-lg p-4 shadow-md max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">計算された中間地点</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>緯度: {centerPoint.lat.toFixed(6)}</div>
                <div>経度: {centerPoint.lng.toFixed(6)}</div>
                <div>半径: {centerPoint.radius.toFixed(2)}km</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
