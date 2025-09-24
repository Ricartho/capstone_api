import { ApiProperty } from '@nestjs/swagger';


export class UserDto{
     @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the user',
    })
    public id: string;

     @ApiProperty({
        example: 'user1',
        description: 'A Username exemple',
    })
    public name: string;

    @ApiProperty({
        example: 'user@user.com',
        description: 'An email exemple',
    })
    public email: string;
}