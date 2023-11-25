import React , {useState} from 'react'
import axios from 'axios';
const DiabetesTrack = () => {

  const [bloodSugarLevel,setBloodSugarLevel] = useState(0);
  const [date, setDate] = useState(() => new Date());
  const [notes,setNotes] = useState('');


  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
        await axios.post('http://localhost:5000/diabetes', {
          bloodSugarLevel: bloodSugarLevel,
          date: date,
          notes: notes
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => console.log(res.data));
      }  catch (error) {
        console.log(error);
      }
  }


  return (
    <div className='flex justify-center items-center flex-col mt-40'>
     <form onSubmit={handleSubmit} className='flex  bg-[pink] justify-center items-start flex-col rounded-2xl  p-5' >
           <label className="font-bold text-[18px]" for="bloodSugarLevel">Enter Your Measured Blood Sugar Level</label>
           <input type="number" className='border border-2 outline-none  p-2 m-2   rounded-xl' name="bloodSugarLevel" placeholder='Enter Here' 
           onChange={(e)=>{setBloodSugarLevel(e.target.value)}}
           value={bloodSugarLevel} />

          <label className="font-bold text-[18px]" for="bloodSugarLevel">Enter Date Measured</label>
           <input type="date"  className='border border-2 outline-none p-2 m-2  rounded-xl' name="date" placeholder='Enter Here' value={date}   
           onChange={(e)=>{setDate(e.target.value)}}/>

          <label className="font-bold text-[18px]" for="bloodSugarLevel">Enter More Details</label>
           <textarea  className='border border-2 outline-none p-2 m-2  rounded-xl' name="notes" placeholder='Enter Here' vlaue={notes}   
           onChange={(e)=>{setNotes(e.target.value)}}/>

        <button type="submit" className='rounded-2xl bg-[blue] text-[white] p-2 w-[5rem]'>ADD</button>
     </form>
    </div>
  )
}

export default DiabetesTrack
