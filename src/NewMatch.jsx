import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify";
const NewMatch = ()=>{
    const author_id = localStorage.getItem("author_id")
    const [hostTeam,setHostTeam] = useState("")
    const [visitorTeam,setVisitorTeam] = useState("")
    const [tossWinner,setTossWinner] = useState("")
    const [elected,setElected] = useState("")
    const navigate = useNavigate();
    const [over,setOver] = useState(null)
    const [loading,setLoading] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const onSubmit = (e)=>{
        const Token = localStorage.getItem("Token")
        e.preventDefault();
        if(hostTeam==="" || visitorTeam==="" || tossWinner==="" || elected==="" || over===null){
            if(hostTeam===""){
                const notify = ()=>{
                    toast("Host Team can not be empty!")
                }
                notify()
            }
            if(visitorTeam===""){
                const notify = ()=>{
                    toast("Visitor Team can not be empty!")
                }
                notify()
            }
            if(tossWinner===""){
                const notify = ()=>{
                    toast("Toss Won By can not be empty!")
                }
                notify()
            }
            if(elected===""){
                const notify = ()=>{
                    toast("Elected to can not be empty!")
                }
                notify()
            }
            if(over===null){
                const notify = ()=>{
                    toast("Over can not be empty!")
                }
                notify()
            }
            return 
        }
        const start_match = async()=>{
            setLoading(true)
            const newMatchResponse = await fetch(`${VITE_REQUEST_URL}match/start/`,{method:'POST',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            },body:JSON.stringify({
                "host_team_name":hostTeam,
                "visitor_team_name":visitorTeam,
                "toss_winner_team_name":tossWinner,
                "elected":elected,
                "over":over,
                "author_id":author_id,
                })
            })
        const new_match = await newMatchResponse.json()
        if(new_match){
            localStorage.setItem("match_id",new_match.match_id)
            localStorage.removeItem("over_finished")
            setLoading(false)
            navigate('/select_opening_player')
        }
        }
        
        start_match()
    }
    return (
        <div style={{height:'100vh'}} className="bg-gray-200 flex justify-center items-center">
            <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="bg-gray-200 p-3 rounded rounded-6">
            <div className="w-72 p-4">
                <div>
                    <h1 className="font-bold">Teams</h1>
                </div>
               <div style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="bg-gray-200 rounded-md shadow-md p-2">
                    <div className="m-2">
                        <input onChange={(e)=>(setHostTeam(e.target.value))} type="text" id="host_team" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2 font-bold" placeholder="Unique Host Team Name" required />
                    </div>
                    <div className="m-2">
                        <input onChange={(e)=>(setVisitorTeam(e.target.value))} type="text" id="visitor_team" className="border-b dark:text-gray-900 text-sm block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2 font-bold" placeholder="Unique Visitor Team Name" required />
                    </div>
               </div>
                
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1 className="font-bold">Toss Won By?</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <div>
                        <input onChange={(e)=>setTossWinner(e.target.value)} type="radio" id={hostTeam} name="fav_language" placeholder="Host Team" value={hostTeam}/>
                        <label className="font-bold" htmlFor={hostTeam}>{hostTeam}</label><br/>
                    </div>
                    <div className="ms-3">
                        <input onChange={(e)=>setTossWinner(e.target.value)} type="radio" id={visitorTeam} name="fav_language" placeholder="Visitor Team" value={visitorTeam}/>
                        <label className="font-bold" htmlFor="visitorTeam">{visitorTeam}</label><br/>    
                    </div>        
                </div>   
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1 className="font-bold">Elected to?</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <div>
                        <input onChange={(e)=>setElected(e.target.value)} type="radio" id="Bat" name="elected" value="Bat"/>
                        <label className="font-bold" htmlFor="Bat">Bat</label><br/>
                    </div>
                    <div className="ms-3">
                        <input onChange={(e)=>setElected(e.target.value)} type="radio" id="Bowl" name="elected" value="Bowl"/>
                        <label className="font-bold" htmlFor="Bowl">Bowl</label><br/>   
                    </div>        
                </div>   
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1 className="font-bold">Overs to?</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>(setOver(e.target.value))} type="number" id="over" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 font-bold focus:border-b-2" placeholder={over} required />
                </div>   
            </div>
            <div className="flex justify-evenly gap-2">
                <div>
                    <Link className="font-bold">Advanced Settings</Link>
                </div>
                <div>
                    <Link onClick={(e)=>onSubmit(e)} className="bg-green-700 py-2 flex items-center w-28 justify-center font-bold rounded-md text-white">{loading?(
                        <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                        </div>):("Start Match")}
                        </Link>
                </div>
            </div>
            </div>
            <div>
                <ToastContainer />
            </div>
        </div>
    )
}


export default NewMatch