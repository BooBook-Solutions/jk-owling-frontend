import React, { createContext, useContext, useState } from 'react';

import { jwtDecode } from "jwt-decode";
import useCustomEffect from '../../Hooks/useCustomEffect';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

	const [userState, setUserState] = useState(() => {
		const storedUserState = localStorage.getItem('userState');
		return storedUserState ? JSON.parse(storedUserState) : { isAuth: false, token: "" };
	});

  	const login = (authToken) => {
		setUserState({
			isAuth: true,
			token: authToken
		});
  	}

  	const getDecodedState = () => {
	if(userState.isAuth){
		const decodedToken = jwtDecode(userState.token);
		const isUserAdmin = decodedToken.user.role.name === "admin";
		return { isAuth: userState.isAuth, user: decodedToken.user, isAdmin: isUserAdmin, expires: decodedToken.expires }
	} else 
		return { isAuth: false, user: {}, expires: null };
  	}

	const logout = () => {
		setUserState({
		isAuth: false,
		token: ""
		});
	};

	const handleStorage = () => {
		if(userState.isAuth)
		localStorage.setItem("userState", JSON.stringify(userState));
		else
		localStorage.removeItem("userState");
	}

	const handleExpiration = () => {
		if(userState.isAuth){
		const exp = jwtDecode(userState?.token).expires * 1000;
		if (exp < Date.now()) { logout(); }
		}
	}

	useCustomEffect({ functions: [handleStorage], dependencies: [userState] });
	useCustomEffect({ functions: [handleExpiration] });

	return (
		<AuthContext.Provider value={{ authState: getDecodedState(), token: userState.token, login, logout }}>
		{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => { return useContext(AuthContext); };
