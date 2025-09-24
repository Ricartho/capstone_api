import { ApiProperty } from '@nestjs/swagger';


export class SignupDto{

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
         example: 'MyPassword',
         description: 'An password exemple',
    })
    public password: string
}