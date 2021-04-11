import {Category} from "./entities/Category";
import { FireIcon, CakeIcon } from '@heroicons/vue/outline'

export default {
    categories: [
        {
            text: "Hot",
            value: Category[Category.hot],
            iconColor: "text-red-600",
            isChosen: false,
            icon: FireIcon
        },
        {
            text: "Party",
            value: Category[Category.party],
            iconColor: "text-purple-600",
            isChosen: false,
            icon: CakeIcon
        }
    ],
    defaultCategory: Category[Category.party]
}