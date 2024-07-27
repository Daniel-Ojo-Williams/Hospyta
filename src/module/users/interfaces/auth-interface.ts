import { Request } from 'express';

export type AuthUserPayload = {
  sub: string;
  email: string;
};

export interface AuthRequest extends Request {
  user: AuthUserPayload;
}
