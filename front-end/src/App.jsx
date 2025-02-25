import { RouterProvider } from "react-router-dom";
import { route } from "./Router";
import AuthProvider from "../context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  );
}

export default App;
