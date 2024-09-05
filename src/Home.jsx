import { Link } from "react-router-dom"
import { MdSportsCricket } from "react-icons/md";
import { GiTeamIdea } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";

const Home = ()=>{
    return (
    <div style={{height:'100vh'}} className="flex justify-center bg-gray-700 items-center">
        <div className="flex bg-white p-6 rounded-md gap-6 items-center">
            <div className="flex text-green-700 flex-col items-center justify-center">
            <MdSportsCricket/>
            <Link to={'/new_match'} className="font-bold">
                New Match
            </Link>
            </div>
            <div className="flex text-green-700 flex-col items-center justify-center">
            <GiTeamIdea />
            <Link to="#" className="font-bold">
                Teams
            </Link>
            </div>
            <div className="flex text-green-700 flex-col items-center justify-center">
            <FaHistory />
            <Link to="#" className="font-bold">
                History
            </Link>
            </div>
        </div>
    </div>
    )
}

export default Home