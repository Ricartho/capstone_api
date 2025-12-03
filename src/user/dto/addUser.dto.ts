import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto{

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
        example: 'jd@ksu.edu',
        description: 'Email of the user',
        })
    public email: string;

@ApiProperty({
        example: 'TRUE',
        description: 'role of user',
        })
    public admin: boolean;

// @ApiProperty({
//         example: '67fd4f4f438adc5d59152243',
//         description: 'The unique identifier of the logged user',
//         })
//     public author: string;


//  @ApiProperty({
//         example: 'TRUE',
//         description: 'Define is user is an Admin or a Student'
//     })
//     public admin: boolean;
}