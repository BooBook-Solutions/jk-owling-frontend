import { useState } from "react";
import { useAuthContext } from "../Components/Context/AuthContext";

const useAuthFetch = (url) => {

    const { login } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleGoogle = (response) => {
        setLoading(true);
        fetch(url, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({google_token: response.credential})
        })
        .then((response) => { 
            if(!response.ok) throw new Error('Network response was not ok');

            setLoading(false);
            return response.json(); 
        })
        .then((data) => { 
            if(data?.token){
                login(data?.token);
            } else throw new Error(data?.message || data);
        })
        .catch((error) => {
            console.error("Fetch error:", error?.message);
            setError(error?.message);
        });
    }

    return { handleGoogle, loading, error }
}

export default useAuthFetch;