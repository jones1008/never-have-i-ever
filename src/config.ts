import {Category} from "./category/Category";
import { FireIcon, CakeIcon } from '@heroicons/vue/outline'
import CategoryObject from "./category/CategoryObject";

export default {
    categories: [
        {
            text: "Hot",
            value: Category.hot,
            iconColor: "text-red-600",
            isChosen: false,
            icon: FireIcon
        } as CategoryObject,
        {
            text: "Party",
            value: Category.party,
            iconColor: "text-purple-600",
            isChosen: false,
            icon: CakeIcon
        } as CategoryObject
    ],
    defaultCategory: Category.party,
    reportLimit: 3,
    maxEditSimilarity: 0.75
}