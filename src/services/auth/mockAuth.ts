import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

class MockAuthService {
  private storageKey = 'fake-store-auth-session';
  private usersKey = 'fake-store-users';

  // Load users from storage or initialize empty
  private async getUsers(): Promise<{ [email: string]: { password: string; user: User } }> {
    try {
      const usersData = await AsyncStorage.getItem(this.usersKey);
      return usersData ? JSON.parse(usersData) : {};
    } catch (error) {
      return {};
    }
  }

  // Save users to storage
  private async saveUsers(users: { [email: string]: { password: string; user: User } }): Promise<void> {
    try {
      await AsyncStorage.setItem(this.usersKey, JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  async signUp(email: string, password: string, name?: string): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    try {
      const users = await this.getUsers();
      
      // Check if user already exists
      if (users[email]) {
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: name || 'User',
      };

      users[email] = { password, user };
      await this.saveUsers(users);

      // Create session
      const session: AuthSession = {
        user,
        token: Math.random().toString(36).substr(2, 20),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      };

      // Store session
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(session));

      return { success: true, session };
    } catch (error) {
      return { success: false, error: 'Failed to sign up' };
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    try {
      const users = await this.getUsers();
      const userData = users[email];
      
      if (!userData || userData.password !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Create session
      const session: AuthSession = {
        user: userData.user,
        token: Math.random().toString(36).substr(2, 20),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      };

      // Store session
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(session));

      return { success: true, session };
    } catch (error) {
      return { success: false, error: 'Failed to sign in' };
    }
  }

  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      await AsyncStorage.removeItem(this.storageKey);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to sign out' };
    }
  }

  async getSession(): Promise<{ session: AuthSession | null; error?: string }> {
    try {
      const sessionData = await AsyncStorage.getItem(this.storageKey);
      
      if (!sessionData) {
        return { session: null };
      }

      const session: AuthSession = JSON.parse(sessionData);

      // Check if session is expired
      if (session.expiresAt < Date.now()) {
        await AsyncStorage.removeItem(this.storageKey);
        return { session: null };
      }

      return { session };
    } catch (error) {
      return { session: null, error: 'Failed to get session' };
    }
  }
}

export const mockAuth = new MockAuthService(); 