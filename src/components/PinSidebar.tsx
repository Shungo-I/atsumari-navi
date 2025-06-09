"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PinLocation, User, CenterPoint } from "@/types";

interface PinSidebarProps {
  pins: PinLocation[];
  users: User[];
  centerPoint: CenterPoint | null;
  currentUser: User | null;
  onAddPin: (lat: number, lng: number, title: string, description?: string) => void;
  onRemovePin: (pinId: string) => void;
}

export function PinSidebar({ 
  pins, 
  users, 
  centerPoint, 
  currentUser, 
  onAddPin, 
  onRemovePin 
}: PinSidebarProps) {
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [newPin, setNewPin] = useState({
    lat: "",
    lng: "",
    title: "",
    description: "",
  });

  const handleAddPin = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(newPin.lat);
    const lng = parseFloat(newPin.lng);
    
    if (isNaN(lat) || isNaN(lng) || !newPin.title.trim()) {
      alert("有効な緯度、経度、タイトルを入力してください");
      return;
    }

    onAddPin(lat, lng, newPin.title.trim(), newPin.description.trim() || undefined);
    setNewPin({ lat: "", lng: "", title: "", description: "" });
    setIsAddingPin(false);
  };

  const userPinCounts = users.map(user => ({
    ...user,
    pinCount: pins.filter(pin => pin.userId === user.id).length,
  }));

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* ヘッダー */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-2">あつまりナビ</h1>
        {currentUser && (
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: currentUser.color }}
            />
            <span className="text-sm text-gray-600">{currentUser.name}</span>
          </div>
        )}
      </div>

      {/* 統計情報 */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{pins.length}</div>
            <div className="text-xs text-gray-500">ピン</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{users.length}</div>
            <div className="text-xs text-gray-500">参加者</div>
          </div>
        </div>
      </div>

      {/* 中間地点情報 */}
      {centerPoint && (
        <div className="p-4 border-b border-gray-200">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">中間地点</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-gray-600 space-y-1">
                <div>緯度: {centerPoint.lat.toFixed(6)}</div>
                <div>経度: {centerPoint.lng.toFixed(6)}</div>
                <div>半径: {centerPoint.radius.toFixed(2)}km</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 参加者一覧 */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" />
          参加者
        </h3>
        <div className="space-y-2">
          {userPinCounts.map(user => (
            <div key={user.id} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: user.color }}
              />
              <span className="flex-1">{user.name}</span>
              <Badge variant="secondary" className="text-xs">
                {user.pinCount}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* ピン追加 */}
      <div className="p-4 border-b border-gray-200">
        {!isAddingPin ? (
          <Button 
            onClick={() => setIsAddingPin(true)}
            className="w-full" 
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            ピンを追加
          </Button>
        ) : (
          <form onSubmit={handleAddPin} className="space-y-3">
            <Input
              placeholder="緯度"
              value={newPin.lat}
              onChange={(e) => setNewPin(prev => ({ ...prev, lat: e.target.value }))}
              required
            />
            <Input
              placeholder="経度"
              value={newPin.lng}
              onChange={(e) => setNewPin(prev => ({ ...prev, lng: e.target.value }))}
              required
            />
            <Input
              placeholder="場所の名前"
              value={newPin.title}
              onChange={(e) => setNewPin(prev => ({ ...prev, title: e.target.value }))}
              required
            />
            <Input
              placeholder="説明（任意）"
              value={newPin.description}
              onChange={(e) => setNewPin(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1">
                追加
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddingPin(false)}
              >
                キャンセル
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* ピン一覧 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            ピン一覧
          </h3>
          <div className="space-y-2">
            {pins.map(pin => {
              const user = users.find(u => u.id === pin.userId);
              const canDelete = currentUser?.id === pin.userId;
              
              return (
                <Card key={pin.id}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: user?.color }}
                          />
                          <span className="text-sm font-medium truncate">
                            {pin.title}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          {pin.userName}
                        </div>
                        {pin.description && (
                          <div className="text-xs text-gray-600 mb-2">
                            {pin.description}
                          </div>
                        )}
                        <div className="text-xs text-gray-400">
                          {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}
                        </div>
                      </div>
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemovePin(pin.id)}
                          className="ml-2 h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {pins.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-8">
                まだピンがありません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 