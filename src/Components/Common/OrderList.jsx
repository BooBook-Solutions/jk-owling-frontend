import React, { useState } from 'react';
import OrderCard from '../Card/OrderCard';
import PageManager from './PageManager';
import SearchBar from './SearchBar';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

import OrderModal from '../Modal/OrderModal';
import useCustomEffect from '../../Hooks/useCustomEffect';

const OrderList = ({ orders, pageItems, type }) => {

    const [filteredOrders, setFilteredOrders] = useState(orders);

    const { pageManager, currentItems: currentOrders } = PageManager(filteredOrders, pageItems);

    const { handleFetch: getStatuses, data: statuses, error: statusesError } = useAPIFetch({
        url: getUrl({ endpoint: "STATUS" })
    })

    useCustomEffect({functions: [getStatuses]}); // on load, get statuses

    const handleOrderDeletion = (deletedOrderId) => {
        // Remove the deleted order from the state
        setFilteredOrders(prevOrders => prevOrders.filter(order => order.id !== deletedOrderId));
    }

    const handleOrderCreation = (createdOrder) => {
        // Add the created order to the state
        setFilteredOrders(prevOrders => [...prevOrders, createdOrder]);
    }

    const handleOrderUpdate = (updatedOrder) => {
        // Update the order in the state
        setFilteredOrders(prevOrders => prevOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    }

    return (
        <div>
            <div className="add-button-container">
                <SearchBar items={orders} setItems={setFilteredOrders} placeholder={"Search orders..."} />
                <OrderModal onCreate={handleOrderCreation} />
            </div>
            <div className="row">
                { !statusesError &&
                    currentOrders.map((order) => (
                    <div key={order.id} className="col-md-4 mb-3">
                        <OrderCard order={order} type={type} statuses={statuses} onUpdate={handleOrderUpdate} onDelete={handleOrderDeletion}/>
                    </div>
                ))}
            </div>
            { pageManager }
        </div>
    );
};

export default OrderList;
