import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTrainScheduleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    train_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    departure_station: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    arrival_station: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ type: Date })
    departure_time: Date;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({ type: Date })
    arrival_time: Date;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    user_id: number;
}
