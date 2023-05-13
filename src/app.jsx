
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth";
import Guest from "./components/Guest";
import BookRide from "./pages/BookRide";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Guest />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<Auth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/order-history" element={<OrderHistory />} /> */}
          <Route path="/book-ride" element={<BookRide />} />
        </Route>
      </Routes>
    </Router>
  )
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//   },
//   {
//     path: "/book-ride",
//     element: <BookRide />,
//   },
//   {
//     element: <Auth />
//   }
// ]);