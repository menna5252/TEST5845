export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
export type LoginPayload = {
  email: string;
  password: string;
};

export type formState = {
  success: boolean;
  error:{
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};