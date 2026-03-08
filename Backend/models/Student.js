import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    schoolBoard: { type: String, required: true },
    tenthGrade: { type: Number, required: true },
    twelfthGrade: { type: Number, required: true },
    streamIn12th: { type: String, required: true },
    favoriteSubject: { type: String, required: true },
    favoriteSubjectMarks: { type: Number, required: true },
    topScoredSubject: { type: String, required: true },
    topSubjectMarks: { type: Number, required: true },
    careerInterest: { type: String, required: true },
    problemSolvingSkill: { type: String, required: true },
    communicationSkill: { type: String, required: true },
    leadershipSkill: { type: String, required: true },
    creativeThinking: { type: String, required: true },
    analyticalAbility: { type: String, required: true },
    socialBehavior: { type: String, required: true },
    longTermGoal: { type: String, required: true },
    extracurricularActivity: { type: String, required: true },
    careerSuggestion: { type: String, required: true }
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;