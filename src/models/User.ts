import {Column, PrimaryGeneratedColumn, CreateDateColumn, Entity} from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false,
    })
    email: string

    @Column({
        type: 'varchar',
        length: '255',
    })
    password: string

    @CreateDateColumn()
    created: Date
}
