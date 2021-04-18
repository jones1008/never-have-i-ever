import {CategoryType} from "./CategoryType";
import CategoryObjectBase from "./CategoryObjectBase";

export default class CategoryObject extends CategoryObjectBase {
    value: CategoryType
    isChosen: boolean = false
    icon: () => any
};