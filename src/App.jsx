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
import UserList from './components/UserList';
import PrivateRoute from './components/PrivateRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast
import MyOrders from './pages/MyOrders';
import Success from './pages/Success';

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <ToastContainer position="top-right" autoClose={3000} />
    
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
      { path: "/my-orders", element: <MyOrders />},
      { 
  
        path: "chat",
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        )
      },
      {
        path: "chat-list",
        element: (
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        )
      },
      { path: "gigs/:id", element: <GigDetail /> },
      { path: "edit-gig/:id", element: <EditGig /> },
    ],
  },
  { path: "success", element: <Success /> },
  { path: "*", element: <p className="text-center p-10">Page Not Found</p> },
  
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
