import { Navigate, Route, Routes } from "react-router-dom"
import { GaragePage } from "../pages/garagePages"
import { WinnersPage } from "../pages/winnersPage"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/garage" element={<GaragePage/>}></Route>
            <Route path="/winners" element={<WinnersPage/>}></Route>
            <Route path="*" element={<Navigate to="/garage" replace />} />
         </Routes>
    )
}