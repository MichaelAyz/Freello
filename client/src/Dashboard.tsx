import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome {auth?.user?.name}</h2>
      <p>This is your dashboard (Boards view will come next phase).</p>
      <button onClick={auth?.logout}>Logout</button>

      <Link
        to="/projects"
        className="text-blue-600 underline hover:text-blue-800">
        Go to Projects Board →
      </Link>

    </div>

  );

  

}
