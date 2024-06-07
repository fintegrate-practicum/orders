import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ParentComponent from './Menu';
import Women_Page from "./Women_Page";
import Men_Page from "./Men_Page";
import Boys_Page from "./Boys_Page";
import Girls_Page from "./Girls_Page";
import Others_Page from "./Others_Page";

const Routs = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ParentComponent />} />
                <Route path="/Women_Page" element={<Women_Page />} />
                <Route path="/Men_Page" element={<Men_Page />} />
                <Route path="/Boys_Page" element={<Boys_Page />} />
                <Route path="/Girls_Page" element={<Girls_Page />} />
                <Route path="/Others_Page" element={<Others_Page />} />
            </Routes>
        </Router>
    );
}
export default Routs