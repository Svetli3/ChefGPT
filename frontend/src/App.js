import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);   // ← store API response

  useEffect(() => {
    axios.get("http://localhost:5104/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);                 // ← save response to state
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Weather Data</h1>

      <pre>
        {JSON.stringify(data, null, 2)}     {/* ← display JSON nicely */}
      </pre>
    </div>
  );
}

export default App;
