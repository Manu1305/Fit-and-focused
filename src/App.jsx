import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Rules from './pages/Rules';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="min-h-svh bg-[#f4f5f7] dark:bg-[#0f1115] md:flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 min-w-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
