import { IsNotEmpty } from 'class-validator';
export class CreateBonsaiDTO {
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
