import { IsNotEmpty } from 'class-validator';
export class UpdateBonsaiDTO {

    @IsNotEmpty()
    readonly name: string;
  
    @IsNotEmpty()
    readonly age: number;
  
    readonly description?: string;
  
    readonly images?: string[];
  
    @IsNotEmpty()
    readonly species: string;
  
    readonly interventions?: string[];
}