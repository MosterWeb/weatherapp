import Request from './components/Request.js';
import './App.css';


document.title = "AppWeather";

function App() {
  return (
    <div className="background">
      <Request />
    </div>
  );
}

export default App;