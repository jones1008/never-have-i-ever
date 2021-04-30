import { createStore } from 'vuex'
import Question from "./classes/question/Question";
import {SparklesIcon} from '@heroicons/vue/outline';
import config from "./config";
import clone from "./utils/clone";
import CategoryObject from "./classes/category/CategoryObject";
import {CategoryType} from "./classes/category/CategoryType";
import {Category} from "./classes/category/Category";
import CategoryIndex from "./classes/category/CategoryIndex";
import questionParser from "./utils/questionParser";

// Create a new store instance.
export default createStore({
    state () {
        // deep clone config.categories
        const categories = clone.cloneArray(config.categories);
        let allCategories = [
            {
                text: "Alle",
                value: "all",
                iconColor: "text-yellow-600",
                isChosen: false,
                icon: SparklesIcon
            } as CategoryObject,
            ...categories
        ];

        let defaultCategory = allCategories.find(c => c.value === config.defaultCategory);
        if (defaultCategory) {
            defaultCategory.isChosen = true;
        }

        let categoryIndices: CategoryIndex[] = [new CategoryIndex("all")];
        for (let value in Category) {
            categoryIndices.push(new CategoryIndex(value as CategoryType));
        }

        return {
            globalSuccess: null,
            globalError: null,
            allQuestions: [] as Question[],
            categoryIndices: categoryIndices as CategoryIndex[],
            allCategories: allCategories as CategoryObject[]
        }
    },
    mutations: {
        globalSuccess(state: any, value) {
            state.globalError = null;
            state.globalSuccess = value;
        },

        globalError(state: any, value) {
            state.globalSuccess = null;
            state.globalError = value;
        },

        allQuestions(state: any, value) {
            state.allQuestions = value;
        },

        setQuestion(state: any, question: Question) {
            let foundQuestion = state.allQuestions.find(q => q.id === question.id);

            if (foundQuestion) {
                foundQuestion = question;
            }
        },

        removeQuestion(state: any, question: Question) {
            let foundQuestionIndex = state.allQuestions.findIndex(q => q.id === question.id);

            if (foundQuestionIndex !== -1) {
                state.allQuestions.splice(foundQuestionIndex, 1);
            }
        },

        addToQuestions(state: any, question: Question) {
            state.allQuestions.push(question);
        },

        currentCategoryIndex(state: any, categoryIndex: CategoryIndex) {
            let categoryIndexObj = state.categoryIndices.find(c => c.category === categoryIndex.category);
            categoryIndexObj = categoryIndex;
        },

        allCategories(state: any, value) {
            state.allCategores = value;
        },
    },
    getters: {
        currentQuestions(state, getters): Question[] {
            let category = getters.currentCategory;
            if (category === "all") {
                return state.allQuestions;
            }
            return state.allQuestions.filter(q => q.categories.includes(category))
        },
        currentQuestion(state, getters): Question | null {
            if (getters.currentQuestions.length > 0) {
                return getters.currentQuestions[getters.currentCategoryIndex];
            }
            return null;
        },
        currentQuestionPrefix(state, getters): string | null {
            if (getters.currentQuestion) {
                let prefix = questionParser.getPrefix(getters.currentQuestion);
                if (prefix) {
                    return prefix.trim();
                }
            }
            return null
        },
        currentQuestionSuffix(state, getters): string | null {
            if (getters.currentQuestion) {
                return questionParser.getSuffix(getters.currentQuestion).trim();
            }
            return null;
        },

        currentCategory(state, getters): CategoryType {
            let chosenCategoryObj = state.allCategories.find(i => i.isChosen);
            if (chosenCategoryObj) {
                return chosenCategoryObj.value;
            }
            return "all"
        },
        currentCategoryIndexObject(state, getters): CategoryIndex | null {
            let obj = state.categoryIndices.find(c => c.category === getters.currentCategory);
            return obj || null;
        },
        currentCategoryIndex(state, getters): number {
            let obj = getters.currentCategoryIndexObject;
            if (obj) {
                return obj.index;
            }
            return 0;
        },

        isLastQuestion(state, getters): boolean {
            return getters.currentCategoryIndex >= getters.currentQuestions.length - 1;
        },

        isFirstQuestion(state, getters): boolean {
            return getters.currentCategoryIndex === 0;
        },
    },
    actions: {
        nextQuestion(context): void {
            let categoryIndex = context.getters.currentCategoryIndexObject;
            if (context.getters.isLastQuestion) {
                categoryIndex.index = 0;
                context.commit("currentCategoryIndex", 0);
            } else {
                ++categoryIndex.index;
                context.commit("currentCategoryIndex", categoryIndex);
            }
        },

        prevQuestion(context): void {
            let categoryIndex = context.getters.currentCategoryIndexObject;
            if (context.getters.isFirstQuestion) {
                categoryIndex.index = context.getters.currentQuestions.length - 1
                context.commit("currentCategoryIndex", categoryIndex);
            } else {
                --categoryIndex.index;
                context.commit("currentCategoryIndex", categoryIndex);
            }
        }
    }
})