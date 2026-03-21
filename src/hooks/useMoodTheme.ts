'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios-config';

export function useMoodTheme() {
  const [pulse, setPulse] = useState<any>(null);

  useEffect(() => {
    const fetchMoodPulse = async () => {
      try {
        const response = await api.get('/moods/stats');
        const stats = response.data;
        applyTheme(stats.average, stats.trend);
        setPulse(stats);
      } catch (error) {
        console.error('Failed to fetch mood pulse for theme:', error);
      }
    };

    fetchMoodPulse();
  }, []);

  const applyTheme = (avg: number, trend: string) => {
    const root = document.documentElement;
    
    // Default (Stable/Positive)
    let primary = '262.1 83.3% 57.8%'; // Indigo/Purple
    let bgGradient = 'linear-gradient(to bottom right, hsla(262, 83%, 58%, 0.05), hsla(262, 83%, 58%, 0.02))';

    if (avg < 2.5 || trend === 'DECLINING') {
      // Calming/Supportive (Sage/Blue)
      primary = '160 84% 39%'; // Emerald/Sage
      bgGradient = 'linear-gradient(to bottom right, hsla(160, 84%, 39%, 0.05), hsla(160, 84%, 39%, 0.02))';
    } else if (avg < 3.5) {
      // Balanced/Reflective (Teal)
      primary = '191.6 91.4% 36.5%';
    }

    root.style.setProperty('--primary', primary);
    root.style.setProperty('--dashboard-bg-gradient', bgGradient);
  };

  return pulse;
}
