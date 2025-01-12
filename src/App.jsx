import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./components/QuizApp";
import HomeAvatars from "./components/HomeAvatars";
import Header from "./components/Header";
import StoryPage from "./components/StoryPage";
import Disclaimer from "./components/disclaimer/Disclaimer";
import FeedbackForm from "./components/FeedbackForm";
import FinishScreen from "./components/FinishScreen";

function App() {
  return (
    <div className="text-textColor">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeAvatars />}>
            {" "}
          </Route>
          <Route path="/disclaimer" element={<Disclaimer />}></Route>
          <Route path="/" element={<QuizApp />}></Route>
          <Route path="/story" element={<StoryPage />}></Route>
          <Route path="/feedback" element={<FeedbackForm />}></Route>
          <Route path="/finish" element={<FinishScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
