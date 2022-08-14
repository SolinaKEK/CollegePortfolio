import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/Tetris">Tetris</Link>
                </li>
                <li>
                    <Link to="/Portfolio">Portfolio</Link>
                </li>
                <li>
                    <Link to="/Cave">Cave</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;