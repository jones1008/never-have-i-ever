import { createStore } from 'vuex'
import Question from "./question/Question";
import {SparklesIcon} from '@heroicons/vue/outline';
import config from "./config";
import clone from "./utils/clone";
import CategoryObject from "./category/CategoryObject";
import {CategoryType} from "./category/CategoryType";

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

        return {
            globalSuccess: null,
            globalError: null,
            questions: [] as Question[],
            currentQuestionIndex: 0 as number,
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

        questions(state: any, value) {
            state.questions = value;
        },

        setQuestion(state: any, question: Question) {
            let foundQuestion = state.questions.find(q => q.id === question.id);

            if (foundQuestion) {
                foundQuestion = question;
            }
        },

        removeQuestion(state: any, question: Question) {
            let foundQuestionIndex = state.questions.findIndex(q => q.id === question.id);

            if (foundQuestionIndex !== -1) {
                state.questions.splice(foundQuestionIndex, 1);
            }
        },

        addToQuestions(state: any, question: Question) {
            state.questions.push(question);
        },

        currentQuestionIndex(state: any, value) {
            state.currentQuestionIndex = value;
        },

        allCategories(state: any, value) {
            state.allCategores = value;
        },
    },
    getters: {
        currentQuestion(state, getters): Question | null {
            if (state.questions.length > 0) {
                return state.questions[state.currentQuestionIndex];
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

        isLastQuestion(state, getters): boolean {
            return state.currentQuestionIndex >= state.questions.length - 1;
        },

        isFirstQuestion(state, getters): boolean {
            return state.currentQuestionIndex === 0;
        },
    },
    actions: {
        nextQuestion(context) {
            if (context.getters.isLastQuestion) {
                context.commit("currentQuestionIndex", 0);
            } else {
                context.commit("currentQuestionIndex", ++context.state.currentQuestionIndex);
            }
        },

        prevQuestion(context) {
            if (context.getters.isFirstQuestion) {
                context.commit("currentQuestionIndex", context.state.questions.length - 1);
            } else {
                context.commit("currentQuestionIndex", --context.state.currentQuestionIndex);
            }
        }
    }
})