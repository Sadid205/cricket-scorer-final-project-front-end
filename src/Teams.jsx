import { Link, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
const Teams = ()=>{
    const {author_id} = useParams();
    const Token = localStorage.getItem("Token")
    const [teams,setTeams] = useState()
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const [loading,setLoading] = useState(false)
    // console.log(author_id)
    useEffect(()=>{
        const Teams = async()=>{
           try{
            setLoading(true)
            const get_teams = await fetch(`${VITE_REQUEST_URL}teams/list/${author_id}/`,{method:'GET',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            }})
            const response = await get_teams.json()
            if(get_teams.ok){
                setTeams(response)
            }
            setLoading(false)
           }catch(e){
            console.log(e)
            const notify = ()=> toast.error("Somthing went wrong!")
            notify()
           }
        }
        Teams()
    },[author_id,Token])
    // style={{boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}}
    return (
        <div className="w-screen h-screen">
            <Toaster/>
            {teams?.length>0?(
                teams.map((item,index)=>{
                    return <Link to={`players/${item.id}`} key={index} className="flex shadow top-14 relative border border-gray-700 items-center h-16 gap-4 m-auto mb-4 rounded-md w-full md:w-4/5 p-4">
                    <div className="w-12 h-12 flex items-center justify-center  rounded rounded-full font-bold text-white bg-green-500">
                        <h1 className="text-2xl">
                           {
                            (()=>{
                                const words = item.team_name.split(" ")
                                if (words.length===1){
                                    return words[0].slice(0,2).toUpperCase();
                                }else if(words.length===2){
                                    return words[0].carAt(0).toUpperCase() + words[1].carAt(0).toUpperCase();
                                }else{
                                    return words[0].slice(0,2).toUpperCase();
                                }
                            })()
                           }
                        </h1>
                    </div>
                    <div className="flex gap-2 w-full justify-between md:justify-evenly">
                        <div>
                            <h1 className="font-bold">{item.team_name}</h1>
                            <p className="font-bold">Matches: {item.matches}</p>
                        </div>
                        <div className="flex gap-4">
                            <h1 className="font-bold">Won: {item.won}</h1>
                            <h1 className="font-bold">Lost: {item.lost}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <button className="text-2xl"><MdEdit /></button>
                            </div>
                            <div className="flex items-center">
                            <button className="text-2xl"><MdDelete /></button>
                            </div>
                        </div>
                    </div>
                </Link>
                })
            ):(<div className="flex justify-center h-full items-center md:w-3/4 m-auto">
                {loading?(
                   <div className="rounded-md h-12 w-12 border-4 border-t-4 border-green-600 animate-spin absolute"></div>
                ):( <p className="text-gray-800 font-semibold">No teams available at this moment!</p>)}
                
            </div>)}
        </div>
    )
}

export default Teams;