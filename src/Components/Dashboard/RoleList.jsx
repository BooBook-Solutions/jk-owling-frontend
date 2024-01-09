import React, { useState } from 'react';
import { Table, Form } from 'react-bootstrap';

import PageManager from '../Common/PageManager';

import useAPIFetch from '../../Hooks/useAPIFetch';
import useCustomEffect from '../../Hooks/useCustomEffect';
import getUrl from '../../Endpoints/endpoints';
import SearchBar from '../Common/SearchBar';

const RoleList = ({ users, setUsers, pageItems }) => {

	const [currentUser, setCurrentUser] = useState(null);
	const [filteredUsers, setFilteredUsers] = useState(users);

	const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

	const { handleFetch: getRoles, data: roles, error: rolesError } = useAPIFetch({
		url: getUrl({ endpoint: "ROLES" })
	})

	const { handleFetch: changeRole } = useAPIFetch({
		url: getUrl({ 
			endpoint: "USER_DETAILS", 
			pathParams: { user_id: currentUser?.id }
		}), 
		method: "PUT"
	})

	const handleRoleChange = () => {
		if(currentUser) {
			changeRole({ user_id: currentUser.id, role: currentUser.new_role})
			.then((updatedUser) => {
				if(updatedUser) {
					console.log("Role of user [" + updatedUser.email + "] changed successfully!");
					alert("Role of user [" + updatedUser.email + "] changed successfully!");
					setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
				} else {
					alert("Error while changing role of user [" + currentUser.email + "]. Check console for more details.");
				}
			});
		}
	};

	useCustomEffect({functions: [getRoles]}); // on load, get roles
	useCustomEffect({functions: [() => setFilteredUsers(users)], dependencies: [users]}); // on users change, update filtered users
	useCustomEffect({functions: [handleRoleChange], dependencies: [currentUser]}); // on current user change, change its role

	return (
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
											<p>{rolesError?.message}</p>
										) : (
											<Form.Control as="select" defaultValue={user.role.name} onChange={(e) => setCurrentUser({ id: user.id, email: user.email, new_role: e.target.value })}>
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
	);
};

export default RoleList;
