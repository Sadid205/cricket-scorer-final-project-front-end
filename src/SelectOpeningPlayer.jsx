import { Link,useNavigate} from "react-router-dom"
import { useState} from "react"
const SelectOpeningPlayer = ()=>{
    const navigate = useNavigate()
    const [striker,setStriker] = useState("Player Name")
    const [nonStriker,setNonStriker] = useState("Player Name")
    const [bowler,setBowler] = useState("Player Name")
    const match_id = localStorage.getItem("match_id")
    const [loading,setLoading] = useState(false)
    const onSubmit = (e)=>{
        const Token = localStorage.getItem("Token")
        e.preventDefault()
        // console.log(striker,nonStriker,bowler,match_id)
        const get_response = async()=>{
            setLoading(true)
            const select_player = await fetch('https://cricket-scorer-final-project-back-end.onrender.com/match/select_opening_player/',{method:'POST',headers:{
                Authorization:`Token ${Token}`,
                "Content-Type":"application/json"
            },body:JSON.stringify({
                "match_id":match_id,
                "striker":striker,
                "non_striker":nonStriker,
                "bowler":bowler,
                })
            })
            const select_player_response = await select_player.json()
            // console.log(select_player_response)
            if (select_player_response){
                setLoading(false)
                localStorage.setItem("current_over","0")
            }
            navigate('/count_runs')
        }
        get_response()
    }
    return (
        <div style={{height:'100vh'}} className="bg-slate-400 flex justify-center items-center">
        <div>
            <div className="w-72 p-4">
                <div>
                    <h1>Striker</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>setStriker(e.target.value)}  type="text" id={striker} className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder={striker} required />
                </div>   
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1>Non-Striker</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>setNonStriker(e.target.value)}  type="text" id={nonStriker} className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder={nonStriker} required />
                </div>   
            </div>
            <div className="w-72 p-4">
                <div>
                    <h1>Opening Bowler</h1>
                </div>
                <div className="flex bg-white p-2 rounded-md">
                    <input onChange={(e)=>setBowler(e.target.value)}  type="text" id={bowler} className="border-b dark:text-gray-900 text-sm block w-full p-1 dark:border-gray-600 dark:placeholder-gray-400 text-white outline-none focus:border-green-800 focus:border-b-2" placeholder={bowler} required />
                </div>   
            </div>
            <div className="flex justify-center">
                <Link onClick={onSubmit} className="w-64 p-2 flex items-center justify-center rounded-xl text-center text-white bg-green-600">{loading?(
                    <div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                  </div>
                ):("Start Match")}</Link>
            </div>
        </div>
    </div>
    )
}


export default SelectOpeningPlayer