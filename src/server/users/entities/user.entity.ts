import {User} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class UserEntity implements User {

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ required: false, nullable: true })
    password: string | null;
}
