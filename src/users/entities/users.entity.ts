import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RolesEnum {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  picture: string;
}
