import axios from "axios";
import Student from "../models/Student.js";

// Function to send data to Flask API and save response in MongoDB
export const analyzeStudentData = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. No user ID found." });
        }

        const studentData = req.body; // Get student data from the request body

        // Send data to Flask API
        let flaskResponse;
        try {
            flaskResponse = await axios.post("http://127.0.0.1:5000/predict", studentData);
        } catch (axiosError) {
            console.error("Axios error:", axiosError.response?.data || axiosError.message);
            return res.status(500).json({ message: "Flask API error", error: axiosError.message });
        }

        if (!flaskResponse.data) {
            return res.status(500).json({ message: "Invalid response from Flask API" });
        }

        // Save student data with career suggestion in MongoDB
        const { career } = flaskResponse.data;
        const formattedStudentData = {
            age: studentData.Age,
            gender: studentData.Gender,
            schoolBoard: studentData["School Board"],
            tenthGrade: studentData["10th Grade %"],
            twelfthGrade: studentData["12th Grade %"],
            streamIn12th: studentData["Stream in 12th"],
            favoriteSubject: studentData["Favorite Subject"],
            favoriteSubjectMarks: studentData["Favorite Subject Marks"],
            topScoredSubject: studentData["Top Scored Subject"],
            topSubjectMarks: studentData["Top Subject Marks"],
            careerInterest: studentData["Career Interest"],
            problemSolvingSkill: studentData["Problem Solving Skill"],
            communicationSkill: studentData["Communication Skill"],
            leadershipSkill: studentData["Leadership Skill"],
            creativeThinking: studentData["Creative Thinking"],
            analyticalAbility: studentData["Analytical Ability"],
            socialBehavior: studentData["Social Behavior"],
            longTermGoal: studentData["Long Term Goal"],
            extracurricularActivity: studentData["Extracurricular Activity"],
        };
        
        // Ensure all required fields exist
        for (const key in formattedStudentData) {
            if (!formattedStudentData[key]) {
                return res.status(400).json({ message: `Missing field: ${key}` });
            }
        }
        
        const student = new Student({
            user: userId,
            ...formattedStudentData,
            careerSuggestion: career
        });
        
        await student.save();

        // Send response to frontend
        res.status(201).json({
            message: "Data processed successfully",
            careerSuggestion: flaskResponse.data.career,
            student
        });

    } catch (error) {
        console.error("Error processing student data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Fetch students with user info
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("user", "username email"); // Fetch username & email
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
