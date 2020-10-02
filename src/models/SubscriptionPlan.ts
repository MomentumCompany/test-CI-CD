import {BaseEntity} from "./BaseEntity";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {SubscriptionPlanType} from "../pipes/enums";
import {DateUtils} from "typeorm/util/DateUtils";

@Entity()
export class SubscriptionPlan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "enum", enum: SubscriptionPlanType, default: SubscriptionPlanType.trial})
    type: SubscriptionPlanType;

    @CreateDateColumn()
    startDate: Date;

    @Column()
    endDate: Date;

}
