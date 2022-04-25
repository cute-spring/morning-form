import { Routes, Route, Link } from "react-router-dom";
import MyForm from "./pages/MyForm";
import Simple from "./pages/simple";
import PrefillData from "./pages/prefill-data";

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="myform" element={<MyForm />} />
        <Route path="/Simple" element={<Simple />} />
        <Route path="/prefill-data" element={<PrefillData />} />
      </Routes>
    </div>
  );
}

// App.js
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <div>
          <Link to="/prefill-data">prefill-data</Link>
        </div>
        <div>
          <Link to="/Simple">Simple</Link>
        </div>
        <div>
          <Link to="/myform">myform</Link>
        </div>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <div>
          <Link to="/prefill-data">prefill-data</Link>
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/myform">myform</Link>
        </div>
      </nav>
    </>
  );
}
