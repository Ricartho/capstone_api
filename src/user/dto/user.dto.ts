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

    @ApiProperty({
        example: 'TRUE',
        description: 'Define is user is an Admin or a Student'
    })
    public admin: boolean;

    @ApiProperty({
        example: 'TRUE',
        description:'Define if user account is active or disable'
    })
    public active: boolean;
}