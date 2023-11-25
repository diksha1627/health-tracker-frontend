import React, { useState } from 'react';
import { ListPlus  , Coins , SignOut , PuzzlePiece , BookOpen ,Gauge }  from "@phosphor-icons/react";
import { useNavigate } from 'react-router-dom';


const Sidebar = ({
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

   

    const handleSignOut = async () => {
      
      };


    return (
        <div className="bg-gradient-to-r from-rose-300 to-rose-200  mt-3 rounded-md  ">
            <div className={`container mx-auto flex  ${isMenuOpen ? 'flex-col' : 'flex-col'} items-center justify-between`}>
                {/* Display user name */}
                <div className="text-white text-[20px] font-600 mt-5 w-[10rem]">Hi, </div>

                {/* Burger Menu Icon (mobile view) */}
                <div
                    className="text-white text-[20px] cursor-pointer md:hidden  lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </div>

                <div className=" flex-col lg:h-[90vh] ">
                    {/* buttons (desktop view) */}
                    <div className="hidden md:flex gap-3 flex-col items-between justify-between ">
                    <button onClick={()=>{navigate('/');}} className="bg-[#F5F5F5] rounded-xl pl-2 pr-2 hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] mt-10 flex justify-between items-center " >
                        <Gauge size={32} /> Dashboard</button>
                        <button onClick={()=>{navigate('/diabetes-track');}} className="bg-[#F5F5F5] rounded-xl pl-2 pr-2 hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <ListPlus size={32} /> Diabetes Track</button>
                        <button onClick={()=>{navigate('/diabetes-predict');}} className="bg-[#F5F5F5] rounded-xl pl-2 pr-2 hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <PuzzlePiece size={32} /> Diabetes Predict</button>
                        <button onClick={()=>{navigate('/diabetes-info');}} className="bg-[#F5F5F5] rounded-xl pl-2 pr-2 hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <BookOpen size={32} /> Diabetes Info</button>
                        <button onClick={handleSignOut} className="bg-[#F5F5F5] rounded-xl pl-2 pr-2  hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <SignOut size={32} /> Log-Out</button>
                    </div>

                    {/* Responsive Menu (shown in mobile view) */}
                    {isMenuOpen && (
                        <div className="md:hidden ">
                            <button className=" mb-3 bg-[#F5F5F5] hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] mt-10 flex justify-between items-center " >
                        <Gauge size={32} /> Dashboard</button>
                       <button className="mb-3 bg-[#F5F5F5] hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <ListPlus size={32} /> Generate new</button>
                        <button className="mb-3 bg-[#F5F5F5] hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <PuzzlePiece size={32} /> Get Credits</button>
                        <button className="mb-3 bg-[#F5F5F5] hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <BookOpen size={32} /> Hirebot Guide</button>
                        <button onClick={handleSignOut} className="mb-3 bg-[#F5F5F5] hover:bg-[#333333] border hover:text-white text-black w-[10.5rem] flex justify-between items-center ">
                        <SignOut size={32} /> Log-Out</button>
                        </div>
                    )}
                </div>
            </div>

         
        </div>
    );
};

export default Sidebar;