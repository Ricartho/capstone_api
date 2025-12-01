import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto{

    @ApiPropertyOptional({
       example: 'Jon',
        description: 'First name of the user',
        })
    public fName?: string;

    @ApiPropertyOptional({
       example: 'Do',
        description: 'Last name of the user',
        })
    public lName?: string;

    @ApiPropertyOptional({
       example: 'jd@ksu.edu',
        description: 'Email of the user',
        })
    public email?: string;

    @ApiPropertyOptional({
       example: 'testPassword',
        description: 'Password  of the user',
        })
    public password?: string;

    @ApiPropertyOptional({
      example: 'TRUE',
      description: 'Define is user is an Admin or a Student'
    })
    public admin?: boolean;
}