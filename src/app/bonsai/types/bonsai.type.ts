import { Bonsai } from './../bonsai.entity';
export type BonsaiType = Omit<Bonsai, 'updateTimestamp'>;
