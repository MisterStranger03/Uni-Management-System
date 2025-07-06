// src/app/models/new-user.model.ts
export interface NewUser {
  name: string;
  email: string;
  password: string;
  dob: Date;
  role: 'student' | 'professor';
}