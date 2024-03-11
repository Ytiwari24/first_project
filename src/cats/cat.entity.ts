import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profile_picture: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
