import {CategoryType} from "./CategoryType";

export default class CategoryIndex {
    category: CategoryType
    index: number = 0

    constructor(type: CategoryType) {
        this.category = type;
    }
};