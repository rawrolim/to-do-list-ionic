import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.next-list-do-to',
  appName: 'TODO',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
