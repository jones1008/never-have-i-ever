import {Category} from "./classes/category/Category";
import { FireIcon, CakeIcon } from '@heroicons/vue/outline'
import CategoryObject from "./classes/category/CategoryObject";

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
    maxEditSimilarity: 0.75,
    questionRegex: /^ich (hab[e|']*|wurde|bin|war)( noch nie)*/i,
    defaultPrefix: "Ich hab' noch nie"
}