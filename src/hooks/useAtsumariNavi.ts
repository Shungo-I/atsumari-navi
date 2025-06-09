"use client";

import { calculateCenterPoint, generateRandomColor } from "@/lib/utils";
import type { AppState, CenterPoint, PinLocation, User } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useAtsumariNavi() {
  const [state, setState] = useState<AppState>({
    users: [],
    pins: [],
    centerPoint: null,
    currentUser: null,
  });

  // ユーザー登録
  const registerUser = useCallback((name: string) => {
    const newUser: User = {
      id: uuidv4(),
      name,
      color: generateRandomColor(),
    };

    setState((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
      currentUser: newUser,
    }));

    return newUser;
  }, []);

  // ピンを追加
  const addPin = useCallback(
    (lat: number, lng: number, title: string, description?: string) => {
      if (!state.currentUser) {
        throw new Error("ユーザーが登録されていません");
      }

      const newPin: PinLocation = {
        id: uuidv4(),
        lat,
        lng,
        title,
        description,
        userId: state.currentUser.id,
        userName: state.currentUser.name,
        createdAt: new Date(),
      };

      setState((prev) => ({
        ...prev,
        pins: [...prev.pins, newPin],
      }));

      return newPin;
    },
    [state.currentUser]
  );

  // ピンを削除
  const removePin = useCallback((pinId: string) => {
    setState((prev) => ({
      ...prev,
      pins: prev.pins.filter((pin) => pin.id !== pinId),
    }));
  }, []);

  // ピンを更新
  const updatePin = useCallback((pinId: string, updates: Partial<PinLocation>) => {
    setState((prev) => ({
      ...prev,
      pins: prev.pins.map((pin) => (pin.id === pinId ? { ...pin, ...updates } : pin)),
    }));
  }, []);

  // 中間地点を計算（ピンが変更されたときに自動で実行）
  useEffect(() => {
    const centerPoint = calculateCenterPoint(state.pins);
    setState((prev) => ({
      ...prev,
      centerPoint,
    }));
  }, [state.pins]);

  // ユーザーのピンを取得
  const getUserPins = useCallback(
    (userId: string) => {
      return state.pins.filter((pin) => pin.userId === userId);
    },
    [state.pins]
  );

  // 現在のユーザーのピンを取得
  const getCurrentUserPins = useCallback(() => {
    if (!state.currentUser) return [];
    return getUserPins(state.currentUser.id);
  }, [state.currentUser, getUserPins]);

  // 状態をリセット
  const reset = useCallback(() => {
    setState({
      users: [],
      pins: [],
      centerPoint: null,
      currentUser: null,
    });
  }, []);

  return {
    // 状態
    ...state,

    // アクション
    registerUser,
    addPin,
    removePin,
    updatePin,
    getUserPins,
    getCurrentUserPins,
    reset,
  };
}
