import {Length, IsNotEmpty, MinLength} from "class-validator"

export class MusicCreateDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    author: string
}
