import React from "react";
import Container from 'react-bootstrap/Container';

import BookList from "../Components/Common/BookList";
import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";

import ErrorPage from "./ErrorPage";

import useAPIFetch from '../Hooks/useAPIFetch';
import getUrl from "../Endpoints/endpoints";
import useCustomEffect from "../Hooks/useCustomEffect";

function Catalogue(){

    const { handleFetch: getBooks, data: catalogue, error } = useAPIFetch({
        url: getUrl({ endpoint: "BOOKS" })
    })

    useCustomEffect({functions: [getBooks]}); // on load, get books

    return (
        <>
        { !catalogue && !error ? (
            <LoadingSpinner />
        ) : (
            error ? (
                <ErrorPage eCode={error?.status} eText={error?.message} />
            ) : (
                <>
                    <Navigation />
                    <Container className="p-3">
                        <h1>Catalogue</h1>
                        { catalogue?.length > 0 ? <BookList books={catalogue} pageItems={8} type={"catalogue"}/> : "Empty" }
                    </Container>
                </>
            )
        )}
        </>
    );
}

export default Catalogue;
