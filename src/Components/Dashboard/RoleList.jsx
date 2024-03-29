import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';

import PageManager from '../Common/PageManager';
import SearchBar from '../Common/SearchBar';
import { useAuthContext } from '../Context/AuthContext';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import LoadingSpinner from '../Common/Spinner';

const RoleList = ({ users, setUsers, pageItems }) => {

	const [currentUser, setCurrentUser] = useState(null);
	const [filteredUsers, setFilteredUsers] = useState(users);

	const { authState, logout } = useAuthContext();
	const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

	const { handleFetch: getRoles, data: roles, error: rolesError } = useAPIFetch({
		url: getUrl({ endpoint: "ROLES" })
	})

	const [isUpdating, setIsUpdating] = useState(false);

	const { handleFetch: changeRole, error: updateError } = useAPIFetch({
		url: getUrl({ 
			endpoint: "USER_DETAILS", 
			pathParams: { user_id: currentUser?.id }
		}), 
		method: "PUT"
	})

	const handleSelectValue = ({type}) => {
		if(currentUser){
			const user_select = document.getElementById(currentUser.id+"-role-select");
			
			if(user_select && type === "success"){
				user_select.setAttribute("dv", currentUser.new_role); // Update default value
			} else {
				user_select.value = user_select.getAttribute("dv"); // Restore if fail
			}
		}
	}

	const handleRoleChange = () => {
		if(currentUser) {
			setIsUpdating(true);
			changeRole({ user_id: currentUser.id, role: currentUser.new_role})
			.then((updatedUser) => {
				if(updatedUser) {
					console.log("Role of user [" + updatedUser.email + "] changed successfully!");
					alert("Role of user [" + updatedUser.email + "] changed successfully!");
					setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));

					if(authState.user.id === updatedUser.id && updatedUser.role.name !== "admin") {
                        logout();
                        window.location.href = "/authentication"
                    }

					handleSelectValue({type: "success"});
				}
			})
			.then(() => setIsUpdating(false));
		}
	};

	const handleRoleChangeError = () => {
		if(updateError){
			const errorMessage = updateError ? updateError : "check console for more details.";
			alert("Error while changing role of user [" + currentUser.email + "]: " + errorMessage);
			handleSelectValue({type: "error"});
		}
	}

	useEffect(() => { getRoles() }, []); // on load, get roles
	useEffect(() => { setFilteredUsers(users) }, [users]); // on users change, update filtered users
	useEffect(() => { handleRoleChange() }, [currentUser]); // on current user change, change its role
	useEffect(() => { handleRoleChangeError() }, [updateError]); // on update error, show error

	return (
		<>
		{ isUpdating && <LoadingSpinner position="fixed" /> }
		{ users.length > 0 ? (
			<div>
				<div className="add-button-container">
					<SearchBar items={users} setItems={setFilteredUsers} placeholder={"Search users..."} />
				</div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Email</th>
							<th>Change Role</th>
						</tr>
					</thead>
					<tbody>
						{currentUsers?.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.email}</td>
								<td>
									{ !roles && !rolesError ? (
											<span>Loading roles...</span>
										) : (
											rolesError ? (
												<p>{rolesError?.detail}</p>
											) : (
												<Form.Control as="select" dv={user.role.name} id={user.id+"-role-select"} defaultValue={user.role.name} onChange={(e) => setCurrentUser({ id: user.id, email: user.email, new_role: e.target.value })}>
													{ roles?.map((role) => (<option key={role.name} value={role.name}>{role.name_translated}</option>)) }
												</Form.Control>
											)
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				{ pageManager }
			</div>
		) : (
			<p>There are no users to show.</p>
		)}
		</>
	);
};

export default RoleList;
