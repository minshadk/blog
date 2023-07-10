import {
  BrowserRouter,
  Routes,
  Route,
  // redirect,
  Navigate,
  useParams,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import TextEditor from "./pages/TextEditor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/documents/:id" element={<TextEditor />} />
        <Route path="/" index element={<Login />} />
        <Route path="/login" index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route
          path="/newDocument"
          element={<Navigate to={`/documents/${uuidV4()}`} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
