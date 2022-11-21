import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column} from "typeorm"
import {Length, IsNotEmpty} from "class-validator"

@Entity()
export class Music {
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column()
    name: string

    @IsNotEmpty()
    @Column()
    author: string

    @Column()
    path: string

    @CreateDateColumn()
    created: Date
}
