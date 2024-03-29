import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';

import Sidebar from "../Components/Dashboard/Sidebar";
import UserList from "../Components/Dashboard/UserList";
import BookList from "../Components/Common/BookList";
import RoleList from "../Components/Dashboard/RoleList";
import OrderList from "../Components/Common/OrderList";
import LoadingSpinner from "../Components/Common/Spinner";

import useAPIFetch from '../Hooks/useAPIFetch';
import getUrl from "../Endpoints/endpoints";

import "../Styles/dashboard.scss";

function Dashboard(){

	const { handleFetch: getUsers, data: users, setData: setUsers, error: userError } = useAPIFetch({
		url: getUrl({ endpoint: "USERS" })
	})
	const { handleFetch: getBooks, data: books, setData: setBooks, error: bookError } = useAPIFetch({
		url: getUrl({ endpoint: "BOOKS" })
	})
	const { handleFetch: getOrders, data: orders, setData: setOrders, error: orderError } = useAPIFetch({
		url: getUrl({ endpoint: "ORDERS" })
	})

	useEffect(() => { getUsers() }, []); // On load, get users
	useEffect(() => { getBooks() }, []); // On load, get books
	useEffect(() => { getOrders() }, []); // On load, get orders

	return (
		<>
		<div className="main-wrapper">

			<Sidebar />

			<main className="main-container container-fluid">

				<Container id="users" className="mt-3 mb-5">
				<h1>Users</h1>
				{ !users && !userError ? (
					<LoadingSpinner />
				) : (
					userError ? (
						<p>{userError?.detail}</p>
					) : (
						<UserList users={users} setUsers={setUsers} pageItems={6}/>
					)
				)}
				</Container>

				<Container id="roles" className="mt-5 mb-5">
				<h1>Roles</h1>
				{ !users && !userError ? (
					<LoadingSpinner />
				) : (
					userError ? (
						<p>{userError?.detail}</p>
					) : (
						<RoleList users={users} setUsers={setUsers} pageItems={6}/>
					)
				)}
				</Container>
			
				<Container id="books" className="mt-5 mb-5">
				<h1>Books</h1>
				{ !books && !bookError ? (
					<LoadingSpinner />
				) : (
					bookError ? (
						<p>{bookError?.detail}</p>
					) : (
						<BookList books={books} setBooks={setBooks} pageItems={6} type={"dashboard"} />
					)
				)}
				</Container>
					
				<Container id="orders" className="mt-5 mb-5">
				<h1>Orders</h1>
				{ !orders && !orderError ? (
					<LoadingSpinner />
				) : (
					orderError ? (
						<p>{orderError?.detail}</p>
					) : (
						<OrderList orders={orders} setOrders={setOrders} pageItems={6} type={"dashboard"} />
					)
				)}
				</Container>
				
			</main>
		</div>
		</>
	);
}

export default Dashboard;
