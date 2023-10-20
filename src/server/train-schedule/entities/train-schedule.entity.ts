import { TrainSchedule } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../users/entities/user.entity"; // Assuming there is a UserEntity

export class TrainScheduleEntity implements TrainSchedule {
    constructor(partial: Partial<TrainScheduleEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    schedule_id: number;

    @ApiProperty()
    train_name: string;

    @ApiProperty()
    departure_station: string;

    @ApiProperty()
    arrival_station: string;

    @ApiProperty()
    departure_time: Date;

    @ApiProperty()
    arrival_time: Date;

    @ApiProperty()
    user_id: number;
}
