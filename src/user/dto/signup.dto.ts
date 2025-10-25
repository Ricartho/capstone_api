import { ApiProperty } from '@nestjs/swagger';


export class SignupDto{

     @ApiProperty({
        example: '00124578',
        description: 'A student number exemple',
    })
    public studentNB: string;

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