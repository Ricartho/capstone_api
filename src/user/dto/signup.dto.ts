import { ApiProperty } from '@nestjs/swagger';


export class SignupDto{

   @ApiProperty({
         example: 'user@user.com',
         description: 'An email exemple',
    })
    public email: string;

    @ApiProperty({
         example: 'MyPassword',
         description: 'An password exemple',
    })
    public password: string

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
}