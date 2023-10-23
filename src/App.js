import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './routes/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
        // <Router>
        //     <Switch>
        //         <Route path="/">
        //             <Home />
        //         </Route>
        //     </Switch>
        // </Router>
    );
}

export default App;
