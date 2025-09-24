import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{

    @ApiProperty({
         example: 'user@user.com',
        description: 'An email exemple',
    })
    public email: string;

      @ApiProperty({
            example: 'MyPassword',
            description: 'An password exemple',
        })
    public password: string;
}