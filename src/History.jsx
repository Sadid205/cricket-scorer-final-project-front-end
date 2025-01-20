import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const History = ()=>{
    const navigate = useNavigate()
    const {author_id} = useParams()
    const Token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const [matches,setMatches] = useState()
    const [loading,setLoading] = useState(false)
    const [isDeleted,setIsDeleted] = useState(false)
    const [loadingMatches,setLoadingMatches] = useState({});
    useEffect(()=>{
        const Matches = async()=>{
          try{
            setLoading(true)
            const get_matches = await fetch(`${VITE_REQUEST_URL}match/list/${author_id}/`,{method:'GET',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            }})
            const response = await get_matches.json()
            if(response){
                setMatches(response)
                setLoading(false)
            }
          }catch(e){
            console.log(e)
          }
        }
        Matches()
    },[author_id,Token,isDeleted])
    const ResumeMatch = (e,match_id)=>{
        e.preventDefault()
        localStorage.removeItem("match_id")
        localStorage.setItem("match_id",match_id)
        navigate("/count_runs")
    }
    const DeleteMatch = async(e,match_id)=>{
        e.preventDefault()
        setLoadingMatches((prevState)=>({...prevState,[match_id]:true}))
        const delete_match = await fetch(`${VITE_REQUEST_URL}match/${match_id}/`,{method:'DELETE',headers:{
            Authorization:`Token ${Token}`,
            "Content-Type":"application/json"
        }})
        if (delete_match.status===204){
            const notify = ()=> toast.success("Successfully deleted match!")
            notify()
            setIsDeleted((prevState)=>!prevState)
        }
    }
    return (
        <div className="w-screen h-screen">
            <Toaster/>
           {matches?.length>0?( <div className="flex flex-wrap gap-4 md:w-3/4 m-auto">
                {matches.map((match,index)=>{
                    return <div key={index} style={{boxShadow:'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}} className="w-96 h-44 p-2 mb-3 m-auto rounded-md">
                    <p>{(()=>{
                        const dateStr = match.date
                        const date = new Date(dateStr)
                        const formattedDate = date.toLocaleString("en-GB",{
                            day:"2-digit",
                            month:"2-digit",
                            year:"numeric",
                            hour:"2-digit",
                            minute:"2-digit",
                            hour12:true,
                        })
                       return formattedDate
                    })()}</p>
                    <div className="flex mt-2 justify-between items-center">
                        <div>
                            <div className="flex gap-2 items-center">
                                <div className="bg-amber-700 flex items-center justify-center w-8 h-8 rounded rounded-full">
                                    <p className="text-white font-semibold">
                                    {
                                        (()=>{
                                            const words = match.team1.team_name.split(" ")
                                            if (words.length===1){
                                                return words[0].slice(0,2).toUpperCase();
                                            }else if(words.length===2){
                                                return words[0].carAt(0).toUpperCase() + words[1].carAt(0).toUpperCase();
                                            }else{
                                                return words[0].slice(0,2).toUpperCase();
                                            }
                                        })()
                                    }
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold">{match.team1.team_name}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">{
                                (match.toss_winner==match.team1.id&&match.elected=="Bat")||(match.toss_winner==match.team2.id&&match.elected=="Bowl")?(match.first_innings_run+ "/" +match.first_innings_wicket):(match.second_innings_run+ "/" +match.second_innings_wicket)
                            } <span className="text-xs text-gray-600">{
                                match.toss_winner==match.team1.id&&match.elected=="Bat"||(match.toss_winner==match.team2.id&&match.elected=="Bowl")?(match.first_innings_nth_over + "." + match.first_innings_nth_ball):(match.second_innings_nth_over + "." + match.second_innings_nth_ball)
                            }</span></p>
                        </div>
                    </div>
                    <div className="flex mt-2 justify-between items-center">
                        <div>
                            <div className="flex gap-2 items-center">
                                <div className="bg-fuchsia-600 flex items-center justify-center w-8 h-8 rounded rounded-full">
                                    <p className="text-white font-semibold">
                                    {
                                        (()=>{
                                            const words = match.team2.team_name.split(" ")
                                            if (words.length===1){
                                                return words[0].slice(0,2).toUpperCase();
                                            }else if(words.length===2){
                                                return words[0].carAt(0).toUpperCase() + words[1].carAt(0).toUpperCase();
                                            }else{
                                                return words[0].slice(0,2).toUpperCase();
                                            }
                                        })()
                                    }
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold">{match.team2.team_name}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                        <p className="font-semibold">{
                                (match.toss_winner==match.team2.id&&match.elected=="Bat")||(match.toss_winner==match.team1.id&&match.elected=="Bowl")?(match.first_innings_run+ "/" +match.first_innings_wicket):(match.second_innings_run+ "/" +match.second_innings_wicket)
                            } <span className="text-xs text-gray-600">{
                                match.toss_winner==match.team2.id&&match.elected=="Bat"||(match.toss_winner==match.team1.id&&match.elected=="Bowl")?(match.first_innings_nth_over + "." + match.first_innings_nth_ball):(match.second_innings_nth_over + "." + match.second_innings_nth_ball)
                            }</span></p>
                        </div>
                    </div>
                    <p className="text-gray-600 font-semibold">{match.match_status}</p>
                    <div className="flex justify-evenly items-center">
                        <button onClick={(e)=>ResumeMatch(e,match.id)} className="font-semibold">Resume</button>
                        <Link to={`scoreboard/${match.id}`} className="font-semibold">Socreboard</Link>
                        <button disabled={loadingMatches[match.id]==true} onClick={(e)=>DeleteMatch(e,match.id)} className="text-xl text-gray-600"><MdDelete/></button>
                        {
                            loadingMatches[match.id]===true?<div class="border-gray-300 h-4 w-4 animate-spin rounded-full border-4 border-t-green-600" />:null
                        }
                    </div>
                </div>
                })}
            </div>):(<div className="flex justify-center h-full items-center md:w-3/4 m-auto">
                {loading?(
                   <div className="rounded-md h-12 w-12 border-4 border-t-4 border-green-600 animate-spin absolute"></div>
                ):( <p className="text-gray-800 font-semibold">No matches available at this moment!</p>)}
                
            </div>)}
        </div>
    )
}

export default History;