export interface UpdatePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ForgetPasswordPayload {
  email: string;
}
export interface AuthResponse {
  message?: string;
  statusMsg?: string;
}
export interface VerifyResetCodePayload {
  resetCode: string;
}
export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}