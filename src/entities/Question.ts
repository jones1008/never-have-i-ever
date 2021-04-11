import {BaseModel, Field, Model} from "@arbel/firebase-orm";
import {Category} from "./Category";

@Model({
    reference_path: process.env.NODE_ENV === 'production' ? "questions" : "questions-test",
    // reference_path: "questions",
    path_id: "question_id"
})
export default class Question extends BaseModel {
    @Field()
    text!: string;

    @Field()
    reports!: number;

    @Field()
    categories: Category[];
};