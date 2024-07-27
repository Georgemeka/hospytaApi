import { RolesEnum } from 'src/users/entities/users.entity';

export interface AuthRequest {
  user: {
    id?: string;
    email?: string;
    roles?: RolesEnum[];
  };
}
