import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
const NewMatch = ()=>{
    const author_id = localStorage.getItem("author_id")
    const [hostTeam,setHostTeam] = useState("Host Team")
    const [visitorTeam,setVisitorTeam] = useState("Visitor Team")
    const [tossWinner,setTossWinner] = useState("")
    const [elected,setElected] = useState("")
    const navigate = useNavigate();
    const [over,setOver] = useState(5)
    const onSubmit = (e)=>{
        const Token = localStorage.getItem("Token")
        e.preventDefault();
        const start_match = async()=>{
            const newMatchResponse = await fetch('http://127.0.0.1:8000/match/start/',{method:'POST',headers:{
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
        // console.log(new_match)
        localStorage.setItem("match_id",new_match.match_id)
        navigate('/select_opening_player')
        }
        
        start_match()
    }
    return (
        <div style={{height:'100vh'}} className="bg-slate-400 flex justify-center items-center">
            <div>
            <div className="w-72 p-4">
                <div>
                    <h1>Teams</h1>
                </div>
               <div className="bg-white rounded-md shadow-md p-2">
                    <div className="m-2">
                        <input onChange={(e)=>(setHostTeam(e.target.value))} type="text" id="host_team" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder={hostTeam} required />
                    </div>
                    <div className="m-2">
                        <input onChange={(e)=>(setVisitorTeam(e.target.value))} type="text" id="visitor_team" className="border-b dark:text-gray-900 text-sm block w-full p-2 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder={visitorTeam} required />
                    </div>
               </div>
                
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1>Toss Won By?</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <div>
                        <input onChange={(e)=>setTossWinner(e.target.value)} type="radio" id={hostTeam} name="fav_language" value={hostTeam}/>
                        <label htmlFor={hostTeam}>{hostTeam}</label><br/>
                    </div>
                    <div className="ms-3">
                        <input onChange={(e)=>setTossWinner(e.target.value)} type="radio" id={visitorTeam} name="fav_language" value={visitorTeam}/>
                        <label htmlFor="visitorTeam">{visitorTeam}</label><br/>    
                    </div>        
                </div>   
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1>Elected to?</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <div>
                        <input onChange={(e)=>setElected(e.target.value)} type="radio" id="Bat" name="elected" value="Bat"/>
                        <label htmlFor="Bat">Bat</label><br/>
                    </div>
                    <div className="ms-3">
                        <input onChange={(e)=>setElected(e.target.value)} type="radio" id="Bowl" name="elected" value="Bowl"/>
                        <label htmlFor="Bowl">Bowl</label><br/>   
                    </div>        
                </div>   
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1>Overs to?</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>(setOver(e.target.value))} type="number" id="over" className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder={over} required />
                </div>   
            </div>
            <div className="flex justify-evenly gap-2">
                <div>
                    <Link className="font-semi-bold">Advanced Settings</Link>
                </div>
                <div>
                    <Link onClick={(e)=>onSubmit(e)} className="bg-green-700 p-2 rounded-md text-white">Start Match</Link>
                </div>
            </div>
            </div>
        </div>
    )
}


export default NewMatch