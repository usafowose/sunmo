import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("increment")
  profile_id: number;

  @Column({ nullable: false })
  user_id: number

  @Column("varchar", { length: 255, nullable: false })
  display_name: string;

  @Column("varchar", { length: 255, nullable: true })
  profile_icon: string;

  @Column("date", { nullable: false })
  dob: Date;

}