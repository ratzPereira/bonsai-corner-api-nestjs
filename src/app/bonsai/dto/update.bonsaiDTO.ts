import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty } from 'class-validator';
export class UpdateBonsaiDTO {

    @ApiProperty({ example: 'MyBonsai', description: 'The name of your bonsai' })
    @IsNotEmpty()
    readonly name: string;
  
    @ApiProperty({ example: 4, description: 'The age, in years, of your bonsai' })
    @IsNotEmpty()
    readonly age: number;
  
    @ApiProperty({ example: 'Description of my bonsai', description: 'Breaf description of your plant', required:false })
    readonly description?: string;
  
    @ApiProperty({ description: 'Photos of your plant', required:false })
    readonly images?: string[];
  
    @ApiProperty({ example: 'Acer Palmatum', description: 'The species of your bonsai' })
    @IsNotEmpty()
    readonly species: string;
  
    @ApiProperty({ description: 'List of interventions that you did in your bonsai', required:false })
    readonly interventions?: string[];
}