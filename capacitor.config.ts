import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mindbridge.app',
  appName: 'MindBridge',
  webDir: 'out',
  server: {
    url: 'http://10.12.56.68:3000', 
    cleartext: true
  }
};

export default config;
