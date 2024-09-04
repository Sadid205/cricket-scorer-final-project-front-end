import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({Token,children})=>{
    if(!Token){
        return <Navigate to="/login" replace/>
    }
    return children
}

export const ProtectedRouteSOPAndCR = ({Token,match_id,children})=>{
    if(!Token || !match_id){
        return <Navigate to="/new_match" replace/>
    }
    return children
}
