import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Gigs from './pages/Gigs';
import CreateGig from './pages/CreateGig';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import GigDetail from './pages/GigDetail';
import EditGig from "./pages/EditGig";
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "gigs", element: <Gigs /> },
      { path: "create-gig", element: <CreateGig /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "chat", element: <Chat /> },
      { path: "gigs/:id", element: <GigDetail /> },
      { path: "edit-gig/:id", element: <EditGig /> },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
