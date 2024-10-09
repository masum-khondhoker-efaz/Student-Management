import mongoose from "mongoose";
const DataSchema = mongoose.Schema(
    {
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        phone: { type: String, required: true },
        img: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const StudentModel = mongoose.model("students", DataSchema);


export default StudentModel