import Main from "./components/Main/main";
import Sidebar from "./components/Sidebar/sidebat";
import "./index.css";

export default function App() {
  return (
    <div className="flex appear">
        <Sidebar />
        <Main />
    </div>
  );
}
