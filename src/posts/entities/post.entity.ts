import { User } from 'src/users/entities/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

export enum CategoryEnum {
  Liver = 'liver',
  Kidney = 'kidney',
  General = 'general',
}

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'enum', enum: CategoryEnum, default: CategoryEnum.General })
  category: CategoryEnum;

  @Column()
  image: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', eager: true })
  author: User;

  @Column()
  @RelationId((post: Post) => post.author)
  authorId: string;

  // @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  // comments: Comment[];

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
