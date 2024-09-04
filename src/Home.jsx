import { Link } from "react-router-dom"
const Home = ()=>{
    return (
    <div style={{height:'100vh'}} className="flex justify-center bg-gray-700 items-center">
        <div>
            <Link to={'/new_match'} className="border p-2 m-3">New Match</Link>
            <Link to={'#'} className="border p-2 m-3">Teams</Link>
            <Link to={'#'} className="border p-2 m-3">History</Link>
        </div>
    </div>
    )
}

export default Home