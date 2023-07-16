import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

import { Profile } from "..";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: "int"})
    user_id: number;

    @Column("varchar", { length: 255, nullable: false})
    first_name: string;

    @Column("varchar", { length: 255, nullable: false })
    last_name: string;

    @Column("varchar", { length: 255, nullable: false })
    email: string;

    @Column("varchar", { length: 255, nullable: true })
    user_name: string;

    @Column("varchar", { length: 255, nullable: true })
    password: string;

    @Column("date", { nullable: true })
    dob: Date;

    @Column("bool", { default: false })
    is_registered: boolean;

    @OneToOne(() => Profile, profile => profile.user, { onDelete: "CASCADE" })
    profile: Profile

}