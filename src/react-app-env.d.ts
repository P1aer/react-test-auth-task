/// <reference types="react-scripts" />
export interface AuthToken {
  username: string;
  password: string;
}
export interface ReadOnlyUserSerializer {
  [id: string]: number;
  username: string;
  [first_name: string]: string;
  [last_name: string]: string;
  [is_active: string]: boolean;
  [last_login: string]: string;
  [is_superuser: string]: boolean;
}
export interface WriteOnlyUserSerializer extends AuthToken {
  first_name: string;
  last_name: string;
  is_active: string;
}
export interface TokenResponse {
  token: string;
}
