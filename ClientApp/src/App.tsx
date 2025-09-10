
import { Navbar } from './components/Navbar';
import { routes } from './routes/routes';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, useRoutes } from 'react-router-dom';

function AppRoutes() {
  return useRoutes(routes); // load central routes
}

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* common for all pages */}
      <div className="container">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App
