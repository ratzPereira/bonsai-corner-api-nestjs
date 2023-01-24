import { ApiProperty } from '@nestjs/swagger/dist';
export class UpdateUserDTO {

   @ApiProperty({ example: 'email@email.pt', description: 'Your email'})
   readonly email: string

   @ApiProperty({ example: 'MyUsername', description: 'You username'})
   readonly username: string

   @ApiProperty({ description: 'Profile image for your account' })
   readonly image:string

   @ApiProperty({ example: 'Your bio', description: 'Tell something about you' })
   readonly bio: string
}