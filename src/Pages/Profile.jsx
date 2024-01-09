import React from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import UserCard from "../Components/Card/UserCard";

import { useAuthContext } from "../Components/Context/AuthContext";

const Profile = () => {

    const { authState } = useAuthContext();

    return (
        <>
        <Navigation />
        <Container className="centered-div">
            <h1>User Profile</h1>
            <br/>
            <UserCard user={authState.user} type={"profile"} />
        </Container>
        </>
    );
};

export default Profile;