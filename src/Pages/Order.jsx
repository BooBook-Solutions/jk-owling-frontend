import React from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import OrderList from "../Components/Common/OrderList";
import LoadingSpinner from "../Components/Common/Spinner";

import { useAuthContext } from "../Components/Context/AuthContext";

import ErrorPage from "./ErrorPage";

import useAPIFetch from '../Hooks/useAPIFetch';
import getUrl from "../Endpoints/endpoints";
import useCustomEffect from "../Hooks/useCustomEffect";

const Order = () => {

    const { authState } = useAuthContext();
    
    const { handleFetch: getUserOrders, data: orders, error } = useAPIFetch({
        url: getUrl({ 
            endpoint: "ORDERS", 
            queryParams: { user_id: authState.user.id }
        })
    })

    useCustomEffect({functions: [getUserOrders]}); // on load, get user orders

    return (
        <>
        { !orders && !error ? (
            <LoadingSpinner />
        ) : (
            error ? (
                <ErrorPage eCode={error?.status} eText={error?.message} />
            ) : (
                <>
                    <Navigation />
                    <Container className="p-3">
                        <Container id="orders" className="mt-5 mb-5">
                            <h1>Orders</h1>
                            { orders.length > 0 ? <OrderList orders={orders} pageItems={6} type={"user_orders"} /> : "Empty" }
                        </Container>
                    </Container>
                </>
            )
        )}
        </>
    );
};

export default Order;