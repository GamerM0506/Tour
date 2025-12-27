import { BaseEntity } from './base.entity';
import { Difficulty } from '../enums/difficulty.enum';

export class Recipe extends BaseEntity {
    constructor(
        public readonly title: string,
        public readonly ingredients: string[],
        public readonly instructions: string[],
        public readonly difficulty: Difficulty,
        id?: string
    ) {
        super(id);
    }
}