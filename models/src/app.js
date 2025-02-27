import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to GlowGuide</h1>} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App;
