import { ApiProperty } from '@nestjs/swagger';


export class UserDto{
    @ApiProperty({
        example: '67fd4f4f438adc5d59152243',
        description: 'The unique identifier of the user',
    })
    public id: string;

    @ApiProperty({
        example: 'Jon',
        description: 'First name of the user',
        })
    public fName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Last name of the user',
        })
    public lName: string;

    @ApiProperty({
        example: 'user@user.com',
        description: 'An email exemple',
    })
    public email: string;

    @ApiProperty({
        example: 'user@user.com',
        description: 'An email exemple',
    })
    public author: string;

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

      @ApiProperty({
        example: '0',
        description:'Login count of the user'
    })
    public loginCount: number;
}