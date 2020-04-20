import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {UserRoles} from "../pipes/enums";
import {SubscriptionPlan} from "./SubscriptionPlan";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20})
  Name: string;

  @Column({length: 50})
  email: string;

  @Column()
  password: string;

  @Column({length: 10})
  designation: string;

  @Column({length: 10})
  mobileNo: string;

  @Column({
    type: "enum",
    enum: UserRoles, default: UserRoles.organisationalAdmins
  })
  role: UserRoles;

  @Column({length: 20})
  country: string;

  @Column({length: 10})
  countryCode: string;

  @Column({length: 20})
  city: string;

  @Column()
  pincode: number;

  @Column({length: 20})
  organisation: string;

  @OneToOne(type => SubscriptionPlan)
  @JoinColumn()
  subscriptionPlan: SubscriptionPlan
}
