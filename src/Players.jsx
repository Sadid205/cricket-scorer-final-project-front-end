import { Link, useParams } from "react-router-dom"
import { IoMdContact } from "react-icons/io";
import { HiMiniBars4 } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
const Players = ()=>{
    const [players,setPlayers] = useState()
    const {team_id} = useParams()
    const Token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const [loading,setLoading] = useState(false)
    // console.log(author_id)
    useEffect(()=>{
        const GetPlayers = async()=>{
            try{
                setLoading(true)
                const get_players_list = await fetch(`${VITE_REQUEST_URL}player/list/${team_id}/`,{method:'GET',headers:{
                    Authorization:`Token ${Token}`,
                    "Content-Type":"application/json"
                }})
                const response = await get_players_list.json()
                if (get_players_list.ok){
                    setPlayers(response)
                }
                setLoading(false)
            }catch(e){
                console.log(e)
                const notify = ()=> toast.error("Somthing went wrong!")
                notify()
            }
        }
        GetPlayers()
    },[team_id,Token])
    // console.log(players)
    // style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}}
    return (
    <div className="w-screen h-screen">
        <Toaster/>
        {
            players?.length>0?(
                players.map((player,index)=>{
                    return <Link to={`player_details/${player.id}`} key={index} className="flex border border-gray-700 relative top-14 items-center h-16 gap-4 m-auto mb-4 rounded-md w-full md:w-4/5 p-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded rounded-full font-bold text-white bg-green-500">
                        <span className="text-4xl">
                            <IoMdContact />
                        </span>
                    </div>
                    <div className="flex gap-2 items-center w-full justify-between">
                        <div>
                            <h1 className="font-bold">{player.name}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-2xl"><MdEdit /></button>
                            <button className="text-2xl"><MdDelete /></button>
                            <button className="text-2xl"><HiMiniBars4 /></button>
                        </div>
                    </div>
                    </Link>
                })
            ):(<div className="flex justify-center h-full items-center md:w-3/4 m-auto">
                {loading?(
                   <div className="rounded-md h-12 w-12 border-4 border-t-4 border-green-600 animate-spin absolute"></div>
                ):( <p className="text-gray-800 font-semibold">No players available at this moment!</p>)}
            </div>)
        }
    </div>
    )
}

export default Players