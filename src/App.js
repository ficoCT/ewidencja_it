import './App.css';
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
      <>
      <nav>
      <Link to="/computers">Komputery</Link> |{" "}
      <Link to="/software">Oprogramowanie</Link> |{" "}
          <Link to="/login">Zaloguj się</Link>
      </nav>
      <Outlet />
      </>
  );
}

export default App;
