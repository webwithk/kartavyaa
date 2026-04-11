import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE ANON KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

export default App;