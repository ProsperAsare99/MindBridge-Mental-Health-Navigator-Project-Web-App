"use client";

import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';

/**
 * NativeService provides a unified interface for mobile hardware features
 * with safe fallbacks for the web version.
 */
export const NativeService = {
  isNative: () => Capacitor.isNativePlatform(),

  /**
   * Triggers a subtle tactile vibration if on mobile
   */
  hapticImpact: async (style = ImpactStyle.Light) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style });
      } catch (e) {
        console.warn('Haptics not available', e);
      }
    }
  },

  /**
   * Captures a photo using the native camera or web input
   */
  takePhoto: async () => {
    if (Capacitor.isNativePlatform() || Capacitor.isPluginAvailable('Camera')) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });
      return image.webPath;
    }
    // Web fallback logic could go here (e.g., standard file input)
    return null;
  },

  /**
   * Simple key-value storage that persists across app restarts
   */
  setStorage: async (key: string, value: string) => {
    await Preferences.set({ key, value });
  },

  getStorage: async (key: string) => {
    const { value } = await Preferences.get({ key });
    return value;
  }
};
