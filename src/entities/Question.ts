import {BaseModel, Field, Model} from "@arbel/firebase-orm";

@Model({
    reference_path: "questions",
    path_id: "question_id"
})
export default class Question extends BaseModel {
    @Field()
    text!: string;

    @Field()
    reports!: number;
}