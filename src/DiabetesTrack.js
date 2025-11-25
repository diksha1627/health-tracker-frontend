import React, { useState } from "react";
import axios from "axios";

const DiabetesTrack = () => {
  const [bloodSugarLevel, setBloodSugarLevel] = useState(0);
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/diabetes",
        {
          bloodSugarLevel,
          date,
          notes,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(res.data.message); // <-- show success message
    } catch (error) {
      setMessage("Failed to add data");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-40">
      <form
        onSubmit={handleSubmit}
        className="flex bg-[pink] justify-center items-start flex-col rounded-2xl p-5"
      >
        <label className="font-bold text-[18px]">
          Enter Your Measured Blood Sugar Level
        </label>
        <input
          type="number"
          className="border border-2 outline-none p-2 m-2 rounded-xl"
          value={bloodSugarLevel}
          onChange={(e) => setBloodSugarLevel(e.target.value)}
        />

        <label className="font-bold text-[18px]">Enter Date Measured</label>
        <input
          type="date"
          className="border border-2 outline-none p-2 m-2 rounded-xl"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="font-bold text-[18px]">Enter More Details</label>
        <textarea
          className="border border-2 outline-none p-2 m-2 rounded-xl"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-2xl bg-[blue] text-[white] p-2 w-[5rem]"
        >
          ADD
        </button>

        {message && <p className="text-green-700 font-bold mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default DiabetesTrack;
