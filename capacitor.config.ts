import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mindbridge.app',
  appName: 'MindBridge',
  webDir: 'out',
  server: {
    // Replace with your local IP to see changes instantly on your phone
    url: 'http://10.44.20.111:3000', 
    cleartext: true
  }
};

export default config;
