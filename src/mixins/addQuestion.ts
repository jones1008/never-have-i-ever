import Question from "../question/Question";
import {Category} from "../category/Category";
import store from "../store";

export default {
    computed: {

    },
    methods: {
        async addQuestion(text: string, categories: Category[], currentCategory: Category): Promise<Question> {
            return new Promise((resolve, reject) => {
                if (categories.length === 0) {
                    store.commit("globalError", "Kategorie wählen");
                    return reject("no category chosen");
                }
                if (text) {
                    let question: Question = new Question();
                    question.text = this.optimizeQuestion(text);
                    // TODO: überprüfen, ob es diese Frage bereits gibt oder ähnlich: Levensthein Distance, Fuzzy Hashing?
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
                    return reject("text is empty");
                }
            });
        },
        optimizeQuestion(text: string): string {
            text = text.trim().replace(/^ich hab*. noch nie/i, '').trim();
            if (text.substr(-1) !== ".") {
                text = text + ".";
            }
            return text;
        },
    }
}