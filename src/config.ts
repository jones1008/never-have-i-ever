import {Category} from "./classes/category/Category";
import {FireIcon, CakeIcon} from '@heroicons/vue/outline';
import CategoryObject from "./classes/category/CategoryObject";

export default {
    categories: [
        {
            text: "Hot",
            value: Category.hot,
            iconColors: ["text-red-600", "dark:text-red-500"],
            isChosen: false,
            icon: FireIcon
        } as CategoryObject,
        {
            text: "Party",
            value: Category.party,
            iconColors: ["text-purple-600", "dark:text-purple-400"],
            isChosen: false,
            icon: CakeIcon
        } as CategoryObject
    ],
    defaultCategory: Category.party,
    reportLimit: 3,
    maxEditSimilarity: 0.75,
    questionRegex: /^ich (hab[e|']*|wurde|bin|war|hatte)( noch nie)*/i,
    defaultPrefix: "Ich hab' noch nie"
}