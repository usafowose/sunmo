import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

import { User } from "./userentity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("increment")
  profile_id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column("varchar", { length: 255, nullable: false })
  display_name: string;

  @Column("varchar", { length: 255, nullable: true })
  profile_icon: string;

  @Column("date", { nullable: false })
  dob: Date;

  @OneToOne(() => User, user => user.profile, {onDelete: "CASCADE", nullable: false})
  @JoinColumn({name: "user_id"})
  user: User;

}
