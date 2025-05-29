import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Use the provided Supabase credentials
const supabaseUrl = 'https://qocwdnjtfvjaqtijdpqz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvY3dkbmp0ZnZqYXF0aWpkcHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTE5MDcsImV4cCI6MjA2NDEyNzkwN30.3w75k-khntvyboVtoHTc0G7MFJSFewwRPo2oqIhImVg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 