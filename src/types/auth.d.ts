export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface SignInResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface ValidToken {
  tokenInfo: object;
}
