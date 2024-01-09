import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Components/Context/AuthContext";

function PrivateRoute({ children }) {
	const { authState } = useAuthContext();
	
	if (!authState.isAuth) {
		return <Navigate to="/authentication" />;
	}
	
	return children;
}

export default PrivateRoute;
