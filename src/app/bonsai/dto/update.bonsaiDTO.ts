export class UpdateBonsaiDTO {

    readonly name: string;
    readonly age: number;
    readonly description?: string;
    readonly images?: string[];
    readonly species: string;
    readonly interventions?: string[];
}