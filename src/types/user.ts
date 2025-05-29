export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
}

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  name: string;
}; 