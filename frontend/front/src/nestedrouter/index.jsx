
import { HashRouter, Route, Routes } from "react-router-dom"

export default function Nestedrouter() {
    return <div>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </HashRouter>
    </div>
}