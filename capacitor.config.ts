import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mindbridge.app',
  appName: 'MindBridge',
  webDir: 'out',
  server: {
    // url: 'http://192.168.0.197:3000', 
    cleartext: true
  }
};

export default config;
