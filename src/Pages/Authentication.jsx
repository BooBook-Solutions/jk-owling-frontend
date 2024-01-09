import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";

import useAuthFetch from "../Hooks/useAuthFetch";
import getUrl from "../Endpoints/endpoints";

const Authentication = () => {

    const { handleGoogle, loading, error } = useAuthFetch(getUrl({ endpoint: "AUTHENTICATION" }))

    return (
        <>
        <Navigation />
        <Container className="centered-div">
            { !loading && <h1>Authenticate to continue</h1> }
            { error && <p style={{ color: "red" }}>{error}</p>}
            { loading ? (<LoadingSpinner />) : (
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        text="continue_with"
                        shape="pill"
                        onSuccess={handleGoogle}
                        onError={handleGoogle}
                    />
                </GoogleOAuthProvider>
            )}
        </Container>
        </> 
    );
};

export default Authentication;