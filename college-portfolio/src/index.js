import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cave from "./pages/Cave";
import Portfolio from "./pages/Portfolio";
import Tetris from "./pages/Tetris";
import NoPage from "./pages/NoPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="cave" element={<Cave />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="tetris" element={<Tetris />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));