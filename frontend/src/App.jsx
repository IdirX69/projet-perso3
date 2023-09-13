import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { CurrentUserContextProvider } from "../contexts/userContext";
import { CurrentVideosContextProvider } from "../contexts/videosContext";
import Routing from "./components/Routing";

import "./style/index.css";

function App() {
  const largeurEcran = window.innerWidth;
  const breakpoint = 1200;
  return (
    <Router>
      <CurrentVideosContextProvider>
        <CurrentUserContextProvider>
          <Header />
          {largeurEcran > breakpoint ? null : <Navbar />}
          <Routing />
        </CurrentUserContextProvider>
      </CurrentVideosContextProvider>
    </Router>
  );
}

export default App;
