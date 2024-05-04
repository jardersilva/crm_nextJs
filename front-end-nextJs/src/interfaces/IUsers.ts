export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  status: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface IAgentsRequest {
  name: string
  email: string
  password: string
  status: string
}

export interface IAgentsLoginRequest {
  email: string
  password: string
}