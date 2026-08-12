import { FormConfirm } from "../../auth/components/FormConfirm";
import { useState } from "react";


export default function WorkWeek(){
    const [sunday , setSunday ] = useState<boolean>(false);
    const [monday , setMonday ] = useState<boolean>(false);
    const [tuesday , setTuesday ] = useState<boolean>(false);
    const [wednesday , setWednesday ] = useState<boolean>(false);
    const [thursday , setThursday ] = useState<boolean>(false);
    const [friday , setFriday ] = useState<boolean>(false);
    const [saturday , setSaturday ] = useState<boolean>(false);
     
    const days = [
        { name: "Sunday", state: sunday, setter: setSunday },
        { name: "Monday", state: monday, setter: setMonday },
        { name: "Tuesday", state: tuesday, setter: setTuesday },
        { name: "Wednesday", state: wednesday, setter: setWednesday },
        { name: "Thursday", state: thursday, setter: setThursday },
        { name: "Friday", state: friday, setter: setFriday },
        { name: "Saturday", state: saturday, setter: setSaturday },
    ];

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800">2. Working Days</h3>
                <p className="text-gray-500 text-sm mt-1">Select the days your restaurant will be operational.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {days.map((day) => (
                    <label key={day.name} className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${day.state ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <FormConfirm
                            type="checkbox" 
                            className="hidden" 
                            checked={day.state}
                            onChange={(e) => day.setter(e.target.checked)}
                            value=""
                            placeholder=""
                        />
                        <span className={`font-semibold select-none ${day.state ? 'text-orange-600' : 'text-gray-600'}`}>
                            {day.name}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    )
}
