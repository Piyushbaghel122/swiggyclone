/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react"; 
import { FormConfirm } from "../../auth/components/FormConfirm";


const api = axios.create({
    baseURL: "http://localhost:8001/api/v1/reastaurant", 
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials : true
})

export function JobCreate(){
    const [jobTitle, setJobTitle] = useState("");
    const [jobWorkyour, setJobWorkyour] = useState("");
    const [jobType, setJobType] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobSelectorType, setJobSelectorType] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [jobLastCompany, setJobLastCompany] = useState("");
    const [jobFirstCompany, setJobFirstCompany] = useState("");
    const [jobTime , setJobTime] = useState("");
    const [loading , setLoading ] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);
   const HandleJob = async () => {
       try {
          setLoading(true);
          setError(null);
         const response = await api.post("/create-job", {
             jobTitle,
             jobWorkyour,
             jobType,
             jobSalary,
             jobLocation,
             jobSelectorType,
             jobExperience,
             jobLastCompany,
             jobFirstCompany
         });
         console.log(response.data);
         setError("Job created successfully");
       } catch (error: any) {
         setError(error.response?.data || "unknown error");
       } finally {
         setLoading(false);
       }
   }

   return (
    <>
    <div className="flex mx-auto ">
      <div className="">
      
      
      </div>
    </div>
    </>
   )
}

