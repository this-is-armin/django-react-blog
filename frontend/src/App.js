import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import PostDetail from "./pages/PostDetail/PostDetail";

const App = () => {
    return (
        <Router>
            <Header />
            <div className="content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/blog/:slug' element={<PostDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;