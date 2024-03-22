// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class Cat {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: true })
//   profile_picture: string;

//   @Column()
//   name: string;

//   @Column()
//   age: number;

//   @Column()
//   breed: string;
// }


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

enum CatStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

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

  // @Column({ enum: CatStatus, default: CatStatus.ACTIVE })
  // status: CatStatus;

  // @CreateDateColumn({ name: 'created_at' })
  // createdAt: Timestamp;

  // @UpdateDateColumn({ name: 'updated_at' })
  // updatedAt: Timestamp;
}
