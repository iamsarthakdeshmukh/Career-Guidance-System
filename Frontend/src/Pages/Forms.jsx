import React, { useState } from "react";
import Boy2 from '../assets/images/boy2.png'
import Girl from '../assets/images/girl.png'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cloud3 from '../assets/images/cloud3.png'
import { useDispatch } from "react-redux";
import { setCareerData } from "../store/careerSlice";

const Form = () => {
  const [formData, setFormData] = useState({
    "Age": "",
    "Gender": "",
    "School Board": "",
    "10th Grade %": "",
    "12th Grade %": "",
    "Stream in 12th": "",
    "Favorite Subject": "",
    "Favorite Subject Marks": "",
    "Top Scored Subject": "",
    "Top Subject Marks": "",
    "Career Interest": "",
    "Problem Solving Skill": "",
    "Communication Skill": "",
    "Leadership Skill": "",
    "Creative Thinking": "",
    "Analytical Ability": "",
    "Social Behavior": "",
    "Long Term Goal": "",
    "Extracurricular Activity": ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subjectOptions = {
    "Science PCM": ["Physics","Chemistry","Mathematics"],
    "Science PCB": ["Physics","Chemistry","Biology"],
    "Commerce": ["Economics","Accountancy","Business Studies"],
    "Arts": ["History","Political Science","Sociology"]
  };

  const careerOptions = {
    "Science PCM": ["Engineer","Scientist","Software Developer","Architect","Pilot"],
    "Science PCB": ["Doctor","Pharmacist","Biotechnologist"],
    "Commerce": ["Finance Expert","Entrepreneur","Chartered Accountant"],
    "Arts": ["Artist","Lawyer","Journalist","Psychologist"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "Stream in 12th" && { "Favorite Subject": "", "Career Interest": "" })
    }));
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    // Check if age contains only numbers
    if (formData["Age"]) {
      if (isNaN(formData["Age"]) || formData["Age"].toString().includes('.')) {
        newErrors["Age"] = 'Please enter a valid numerical value';
      } else if (formData["Age"] < 0 || formData["Age"] > 100) {
        newErrors["Age"] = 'Please enter a valid age';
      }
    }

    // Check if 10th grade percentage contains only numbers
    if (formData["10th Grade %"]) {
      if (isNaN(formData["10th Grade %"]) || formData["10th Grade %"].toString().includes('.')) {
        newErrors["10th Grade %"] = 'Please enter a valid numerical value';
      } else if (formData["10th Grade %"] < 0 || formData["10th Grade %"] > 100) {
        newErrors["10th Grade %"] = 'Please enter a valid percentage';
      }
    }

    // Check if 12th grade percentage contains only numbers
    if (formData["12th Grade %"]) {
      if (isNaN(formData["12th Grade %"]) || formData["12th Grade %"].toString().includes('.')) {
        newErrors["12th Grade %"] = 'Please enter a valid numerical value';
      } else if (formData["12th Grade %"] < 0 || formData["12th Grade %"] > 100) {
        newErrors["12th Grade %"] = 'Please enter a valid percentage';
      }
    }

    // Check if favorite subject marks contains only numbers
    if (formData["Favorite Subject Marks"]) {
      if (isNaN(formData["Favorite Subject Marks"]) || formData["Favorite Subject Marks"].toString().includes('.')) {
        newErrors["Favorite Subject Marks"] = 'Please enter a valid numerical value';
      } else if (formData["Favorite Subject Marks"] < 0 || formData["Favorite Subject Marks"] > 100) {
        newErrors["Favorite Subject Marks"] = 'Please enter a valid percentage';
      }
    }

    // Check if top subject marks contains only numbers
    if (formData["Top Subject Marks"]) {
      if (isNaN(formData["Top Subject Marks"]) || formData["Top Subject Marks"].toString().includes('.')) {
        newErrors["Top Subject Marks"] = 'Please enter a valid numerical value';
      } else if (formData["Top Subject Marks"] < 0 || formData["Top Subject Marks"] > 100) {
        newErrors["Top Subject Marks"] = 'Please enter a valid percentage';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const formattedData = {
        "Age": parseInt(formData["Age"]),
        "Gender": formData["Gender"],
        "School Board": formData["School Board"],
        "10th Grade %": parseInt(formData["10th Grade %"]),
        "12th Grade %": parseInt(formData["12th Grade %"]),
        "Stream in 12th": formData["Stream in 12th"],
        "Favorite Subject": formData["Favorite Subject"],
        "Favorite Subject Marks": parseInt(formData["Favorite Subject Marks"]),
        "Top Scored Subject": formData["Top Scored Subject"],
        "Top Subject Marks": parseInt(formData["Top Subject Marks"]),
        "Career Interest": formData["Career Interest"],
        "Problem Solving Skill": formData["Problem Solving Skill"],
        "Communication Skill": formData["Communication Skill"],
        "Leadership Skill": formData["Leadership Skill"],
        "Creative Thinking": formData["Creative Thinking"],
        "Analytical Ability": formData["Analytical Ability"],
        "Social Behavior": formData["Social Behavior"],
        "Long Term Goal": formData["Long Term Goal"],
        "Extracurricular Activity": formData["Extracurricular Activity"]
      };

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5002/api/users/analyze", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from backend:", result);

      if (result.careerSuggestion) {
        dispatch(setCareerData(result)); // Store data in Redux
        navigate("/profile");
      } else {
        alert("No career suggestion received from the server.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  }
};


  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <span className="text-red-500 text-xs mt-1">{errors[fieldName]}</span>
    ) : null;
  };

  return (

    <div className=" flex items-center justify-center py-2 bg-contain bg-center relative"  >

        <div className='absolute top-0 w-full' >
            <Navbar/>
        </div>

      <motion.img
        key="boy" // Unique key to force re-render
        className='absolute top-[18%] left-[1.8%]  w-[18vw]'
        src={Boy2}
        alt="boy"
        initial={{ x: "50%" }}
        animate={{ x: 0 }}
        exit={{ x: "50%" }}
        transition={{  delay: 0.4, duration: 0.8, ease: "easeOut" }}
      />

      <motion.img
        key="girl" // Unique key to force re-render
        className='absolute bottom-[25%] right-[6.8%]  w-[13vw]'
        src={Girl}
        alt="girl"
        initial={{ x: "-70%" }}
        animate={{ x: 0 }}
        exit={{ x: "-50%" }}
        transition={{  delay: 0.4, duration: 0.8, ease: "easeOut" }}
      />

      <style>
        {`
           input[type="number"]::-webkit-inner-spin-button,
           input[type="number"]::-webkit-outer-spin-button {
             -webkit-appearance: none;
             margin: 0;
           }
           input[type="number"] {
             -moz-appearance: textfield;
           }
             `}
      </style>


      <div className="w-[60%] mt-20 relative z-10">
        <div className="bg-white/90 w-full rounded-lg shadow-md p-4">
          <h5 className="bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs text-white text-3xl text-center rounded-t-lg p-4 font-bold">Career Guidance Form</h5>
          <form className="grid gap-y-4 bg-white" onSubmit={handleSubmit} noValidate>

            <div className="grid mt-5 grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium ">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : ''}`} required />
                {renderError('firstName')}
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : ''}`} required />
                {renderError('lastName')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input type="number" name="Age" value={formData["Age"]} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter your age" className={`w-full p-2 border rounded ${errors["Age"] ? 'border-red-500' : ''}`} required />
                {renderError('Age')}
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="Gender" value="Male" onChange={handleChange} required /> Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="Gender" value="Female" onChange={handleChange} required /> Female
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="Gender" value="Other" onChange={handleChange} required /> Other
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">School Board</label>
              <select name="School Board" value={formData["School Board"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["School Board"] ? 'border-red-500' : ''}`} required>
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
              </select>
              {renderError('School Board')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">10th Grade %</label>
                <input type="number" name="10th Grade %" value={formData["10th Grade %"]} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter 10th Grade %" className={`w-full p-2 border rounded ${errors["10th Grade %"] ? 'border-red-500' : ''}`} required />
                {renderError('10th Grade %')}
              </div>
              <div>
                <label className="block text-sm font-medium">12th Grade %</label>
                <input type="number" name="12th Grade %" value={formData["12th Grade %"]} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter 12th Grade %" className={`w-full p-2 border rounded ${errors["12th Grade %"] ? 'border-red-500' : ''}`} required />
                {renderError('12th Grade %')}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Stream in 12th</label>
              <select name="Stream in 12th" value={formData["Stream in 12th"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Stream in 12th"] ? 'border-red-500' : ''}`} required>
                <option value="">Select Stream</option>
                <option value="Science PCM">Science (PCM)</option>
                <option value="Science PCB">Science (PCB)</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts/Humanities</option>
              </select>
              {renderError('Stream in 12th')}
            </div>
            {formData["Stream in 12th"] && subjectOptions[formData["Stream in 12th"]] && (
              <div>
                <label className="block text-sm font-medium">Favorite Subject</label>
                <select name="Favorite Subject" value={formData["Favorite Subject"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Favorite Subject"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Favorite Subject</option>
                  {subjectOptions[formData["Stream in 12th"]].map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                {renderError('Favorite Subject')}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Favorite Subject Marks</label>
              <input type="number" name="Favorite Subject Marks" value={formData["Favorite Subject Marks"]} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter Favorite Subject Marks" className={`w-full p-2 border rounded ${errors["Favorite Subject Marks"] ? 'border-red-500' : ''}`} required />
              {renderError('Favorite Subject Marks')}
            </div>

            <div>
              <label className="block text-sm font-medium">Top Scored Subject</label>
              <select name="Top Scored Subject" value={formData["Top Scored Subject"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Top Scored Subject"] ? 'border-red-500' : ''}`} required>
                <option value="">Select Top Scored Subject</option>
                {formData["Stream in 12th"] && subjectOptions[formData["Stream in 12th"]] && 
                  subjectOptions[formData["Stream in 12th"]].map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))
                }
              </select>
              {renderError('Top Scored Subject')}
            </div>

            <div>
              <label className="block text-sm font-medium">Top Subject Marks</label>
              <input type="number" name="Top Subject Marks" value={formData["Top Subject Marks"]} onChange={handleChange} onKeyPress={handleKeyPress} placeholder="Enter Top Subject Marks" className={`w-full p-2 border rounded ${errors["Top Subject Marks"] ? 'border-red-500' : ''}`} required />
              {renderError('Top Subject Marks')}
            </div>

            {formData["Stream in 12th"] && careerOptions[formData["Stream in 12th"]] && (
              <div>
                <label className="block text-sm font-medium">Career Interest</label>
                <select name="Career Interest" value={formData["Career Interest"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Career Interest"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Career Interest</option>
                  {careerOptions[formData["Stream in 12th"]].map((career) => (
                    <option key={career} value={career}>{career}</option>
                  ))}
                </select>
                {renderError('Career Interest')}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Problem Solving Skill</label>
                <select name="Problem Solving Skill" value={formData["Problem Solving Skill"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Problem Solving Skill"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Skill Level</option>
                  <option value="Poor">Poor</option>
                  <option value="Average">Average</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
                {renderError('Problem Solving Skill')}
              </div>
              <div>
                <label className="block text-sm font-medium">Communication Skill</label>
                <select name="Communication Skill" value={formData["Communication Skill"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Communication Skill"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Skill Level</option>
                  <option value="Poor">Poor</option>
                  <option value="Average">Average</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
                {renderError('Communication Skill')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Leadership Skill</label>
                <select name="Leadership Skill" value={formData["Leadership Skill"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Leadership Skill"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Skill Level</option>
                  <option value="Poor">Poor</option>
                  <option value="Average">Average</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
                {renderError('Leadership Skill')}
              </div>

              <div>
                <label className="block text-sm font-medium">Creative Thinking</label>
                <select name="Creative Thinking" value={formData["Creative Thinking"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Creative Thinking"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Skill Level</option>
                  <option value="Poor">Poor</option>
                  <option value="Average">Average</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
                {renderError('Creative Thinking')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Analytical Ability</label>
                <select name="Analytical Ability" value={formData["Analytical Ability"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Analytical Ability"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Skill Level</option>
                  <option value="Poor">Poor</option>
                  <option value="Average">Average</option>
                  <option value="Good">Good</option>
                  <option value="Excellent">Excellent</option>
                </select>
                {renderError('Analytical Ability')}
              </div>


              <div>
                <label className="block text-sm font-medium">Social Behavior</label>
                <select name="Social Behavior" value={formData["Social Behavior"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Social Behavior"] ? 'border-red-500' : ''}`} required>
                  <option value="">Select Social Behavior</option>
                  <option value="Introvert">Introvert</option>
                  <option value="Extrovert">Extrovert</option>
                  <option value="Ambivert">Ambivert</option>
                </select>
                {renderError('Social Behavior')}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Long Term Goal</label>
              <select name="Long Term Goal" value={formData["Long Term Goal"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Long Term Goal"] ? 'border-red-500' : ''}`} required>
                <option value="">Select Long Term Goal</option>
                <option value="Higher Studies">Higher Studies</option>
                <option value="Government Job">Government Job</option>
                <option value="Private Job">Private Job</option>
                <option value="Own Business">Own Business</option>
              </select>
              {renderError('Long Term Goal')}
            </div>

            <div>
              <label className="block text-sm font-medium">Extracurricular Activity</label>
              <select name="Extracurricular Activity" value={formData["Extracurricular Activity"]} onChange={handleChange} className={`w-full p-2 border rounded ${errors["Extracurricular Activity"] ? 'border-red-500' : ''}`} required>
                <option value="">Select Extracurricular Activity</option>
                <option value="Dance">Dance</option>
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Drama">Drama</option>
                <option value="Painting">Painting</option>
                <option value="Coding">Coding</option>
                <option value="Debate">Debate</option>
              </select>
              {renderError('Extracurricular Activity')}
            </div>



            <div className="mt-4">

              <button type="submit" className="bg-gradient-to-r from-cyan-400/80 via-blue-500/80 to-purple-500/80 backdrop-blur-xs w-[100%] text-xl font-semibold text-white p-2 rounded mx-auto block">Submit</button>

            </div>
          </form>
        </div>
      </div>    
    </div>
  );
};

export default Form;
