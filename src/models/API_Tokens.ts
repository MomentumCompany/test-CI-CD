import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class APITokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  expiryDate: Date;

  @Column()
  token: string;

  @Column()
  userId: number;
}
