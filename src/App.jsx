import { Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import MessageList from "./component/MessageList";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import SingePost from "./pages/SingePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Bookmarks from "./pages/Bookmarks";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="messages" element={<MessageList />} />
          <Route path="messages/:receiverId" element={<Messages />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="users/:id" element={<Profile />} />
          <Route path="posts/:id" element={<SingePost />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
