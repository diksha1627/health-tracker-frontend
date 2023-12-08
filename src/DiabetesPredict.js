import React, { useState } from 'react'
import axios from 'axios';
const DiabetesPredict = () => {

    const [pregnancies, setPregnancies] = useState();
    const [glucose, setGlucose] = useState();
    const [bloodpressure, setBloodpressure] = useState();
    const [skinthickness, setSkinthickness] = useState();
    const [insulin, setInsulin] = useState();
    const [bmi, setBmi] = useState();
    const [dpf, setDpf] = useState();
    const [age, setAge] = useState();
   
    const[data,setData] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                pregnancies: pregnancies,
                glucose: glucose,
                bloodpressure: bloodpressure,
                skinthickness: skinthickness,
                insulin: insulin,
                bmi: bmi,
                dpf: dpf,
                age: age
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Check if the response has a 'data' property
            if (response.data && response.data.data && response.data.data.length > 0) {
                const prediction = response.data.data[0];
                console.log(prediction);
                setData(prediction);
            } else {
                console.log('Invalid response format');
            }
    
        } catch (error) {
            console.log(error);
        }
    }
    


    return (
        <div className='flex flex-col  justify-center items-center m-40'>
        <div className='flex justify-center items-center  bg-[pink] rounded-xl'>
            <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-5  items-center   p-5' >
               <div className='flex justify-center items-start flex-col m-2 '>
                <label className="font-bold text-[18px]" for="pregnancies">Enter Pregnancies</label>
                <input type="number"  className='border border-2 outline-none  p-1 m-1   rounded-xl' name="pregnancies" placeholder='Enter Here'
                    onChange={(e) => { setPregnancies(e.target.value) }}
                    value={pregnancies} />
                </div>
               <div className='flex justify-center items-start flex-col m-2'>
                <label className="font-bold text-[18px]" for="glucose">Enter Glucose</label>
                <input type="number" className='border border-2 outline-none p-1 m-1  rounded-xl' name="glucose" placeholder='Enter Here' value={glucose}
                    onChange={(e) => { setGlucose(e.target.value) }} />
                  </div>
               <div className='flex justify-center items-start flex-col m-2'>              
                <label className="font-bold text-[18px]" for="bloodpresuure">Enter BloodPressure Level</label>
                <input type="number" className='border border-2 outline-none p-1 m-1  rounded-xl' name="bloodpressure" placeholder='Enter Here' value={bloodpressure}
                    onChange={(e) => { setBloodpressure(e.target.value) }} />
                 </div>
               <div className='flex justify-center items-start flex-col m-2'>             
                <label className="font-bold text-[18px]" for="skinthickiness">Enter Skin Thickness Level</label>
                <input type="number"  className='border border-2 outline-none p-1 m-1  rounded-xl'
                    name="skinthickness" placeholder='Enter Here' value={skinthickness}
                    onChange={(e) => { setSkinthickness(e.target.value) }} />
                </div>
               <div className='flex justify-center items-start flex-col m-2'>
                <label className="font-bold text-[18px]" for="insulin">Enter Insulin Level</label>
                <input type="number" className='border border-2 outline-none p-1 m-1  rounded-xl' name="insulin" placeholder='Enter Here' value={insulin}
                    onChange={(e) => { setInsulin(e.target.value) }} />
                </div>
               <div className='flex justify-center items-start flex-col m-2'>                
                <label className="font-bold text-[18px]" for="bmi">Enter BMI</label>
                <input type="number" className='border border-2 outline-none p-1 m-1  rounded-xl' name="bmi" placeholder='Enter Here' value={bmi}
                    onChange={(e) => { setBmi(e.target.value) }} />
                </div>
               <div className='flex justify-center items-start flex-col m-2'>                
                <label className="font-bold text-[18px]" for="dpf">Enter DPF</label>
                <input type="number" className='border border-2 outline-none p-1 m-1  rounded-xl' name="dpf" placeholder='Enter Here'
                    value={dpf}
                    onChange={(e) => { setDpf(e.target.value) }} />
                </div>
               <div className='flex justify-center items-start flex-col m-2'>
                <label className="font-bold text-[18px]" for="age">Enter Age</label>
                <input type="number" className='border border-2 outline-none p-1 m-1  rounded-xl' name="age" placeholder='Enter Here'
                    value={age}
                    onChange={(e) => { setAge(e.target.value) }} />
                </div>
                <button type="submit" className='rounded-2xl bg-[blue] text-[white] p-2 w-[5rem]'>ADD</button>
            </form>
        </div>
        <p className='m-5 text-[25px] text-bold'>Diabetes : {data? 'Yes' : 'No'}</p>

        </div>
    )
}

export default DiabetesPredict
