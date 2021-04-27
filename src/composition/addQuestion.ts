import {computed, reactive, ref} from "vue";
import CategoryObjectBase from "../classes/category/CategoryObjectBase";
import CategoryObject from "../classes/category/CategoryObject";
import clone from "../utils/clone";
import config from "../config";
import {CategoryType} from "../classes/category/CategoryType";
import store from "../store";
import {Category} from "../classes/category/Category";
import Question from "../classes/question/Question";
import {goHome} from "../utils/router";

const defaultPrefix = config.defaultPrefix+" "
const text = ref<string>(defaultPrefix);
const categoryMissingMessage = ref<string>("");
const categoryDropdown = ref<boolean>(false);

const dropdownBlank = reactive<CategoryObjectBase>({
    text: "Kategorien",
    iconColor: "text-gray-400"
});

const categories = reactive<CategoryObject[]>(
    clone.cloneArray(config.categories)
);

const chosenCategories = computed<Category[]>(() => {
    let items = categories.filter(i => i.isChosen);
    let cat: Category[] = [];
    for (let item of items) {
        cat.push(item.value as Category);
    }
    return cat;
});

const currentCategory = computed<CategoryType>(() => {
    return store.getters.currentCategory;
});

const optimizeQuestion = (text: string): string => {
    // text = text.trim();
    // text = text.replace(/^ich hab*. noch nie/i, ''); // remove unnecessary starting
    // text = text.replace(/[\.\?\!]+$/g, ''); // remove sentence endings
    text = text.trim();
    return text;
}

const addQuestion = (text: string, categories: Category[], currentCategory: Category): Promise<Question> => {
    return new Promise((resolve, reject) => {
        if (text) {
            if (categories.length === 0) {
                categoryMissingMessage.value = "Kategorie wählen";
                return reject("no category chosen");
            }
            let question: Question = new Question();
            question.text = optimizeQuestion(text);
            question.reports = 0;
            question.categories = categories;
            return question.save().then((createdQuestion) => {
                store.commit("globalSuccess", "hinzugefügt");

                // add to questions if category is currently being viewed
                if (categories.includes(currentCategory)) {
                    store.commit("addToQuestions", createdQuestion);
                }
                return resolve(createdQuestion);
            }).catch(err => {
                store.commit("globalError", "Fehler beim Hinzufügen");
                return reject(err);
            });
        } else {
            store.commit("globalError", "Bitte etwas eingeben");
            return reject("text is empty");
        }
    });
}

const add = (): void => {
    addQuestion(text.value, chosenCategories.value, currentCategory.value as Category).then(() => {
        resetValues();
        goHome();
    });
};

const resetValues = (): void => {
    text.value = defaultPrefix;
    for (let category of categories) {
        category.isChosen = false;
    }
};

const openCategory = (): void => {
    categoryDropdown.value = true;
    categoryMissingMessage.value = "";
};

export default {
    text,
    categoryMissingMessage,
    categoryDropdown,
    dropdownBlank,
    categories,
    openCategory,
    add
}