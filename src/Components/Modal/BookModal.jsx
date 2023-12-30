import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function BookModal({ book }) {

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(book ? book.title : "");
    const [author, setAuthor] = useState(book ? book.author : "");
    const [description, setDescription] = useState(book ? book.description : "");
    const [cover, setCover] = useState(book ? book.cover : "");
    const [price, setPrice] = useState(book ? book.price : "");
    const [quantity, setQuantity] = useState(book ? book.quantity : "");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleAuthorChange = (e) => setAuthor(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCoverChange = (e) => setCover(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleQuantityChange = (e) => setQuantity(e.target.value);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTitle(book ? book.title : "");
        setAuthor(book ? book.author : "");
        setDescription(book ? book.description : "");
        setCover(book ? book.cover : "");
        setPrice(book ? book.price : "");
        setQuantity(book ? book.quantity : "");
        setShow(true);
    }

    const { handleFetch: updateBook, data: updatedBook, error: bookUpdateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOK_DETAILS", 
          pathParams: { bookId: book?.id }
        }), 
        method: "PUT",
        body: { title: title, author: author, description: description, cover: cover, price: price, quantity: quantity }
    })

    const { handleFetch: createBook, data: createdBook, error: bookCreateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOKS"
        }), 
        method: "POST",
        body: { title: title, author: author, description: description, cover: cover, price: price, quantity: quantity }
    })

    const handleSaveChanges = () => {
        if (![title, author, description, cover, price, quantity].every(Boolean)) {
            alert("Please fill in all fields");
        } else { 
            if(book) updateBook();
            else createBook(); 
        }
    };

    useEffect(() => {
        if(updatedBook || createdBook){
            alert(JSON.stringify(updatedBook || createdBook));
            window.location.reload();
        }
    
        if(bookUpdateError || bookCreateError){
            alert("Something went wrong! Check console logs...");
            console.error(bookUpdateError || bookCreateError);
        }
    }, [updatedBook, createdBook, bookUpdateError, bookCreateError]);

    return (
        <>
        { book && <Button variant="primary" onClick={handleShow}>Update</Button> }
        { !book && 
            <Button variant="success" style={{padding: "1px", display: "flex", marginLeft: "10px"}} onClick={handleShow}>
                <box-icon type="solid" color="white" name="plus-square"></box-icon>
            </Button>
        }

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ book ? "Change Book Info" : "Create New Book" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="title" defaultValue={title} onChange={handleTitleChange} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="author" defaultValue={author} onChange={handleAuthorChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="description" defaultValue={description} onChange={handleDescriptionChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cover</Form.Label>
                    <Form.Control type="text" placeholder="cover link" defaultValue={cover} onChange={handleCoverChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="price" defaultValue={price} onChange={handlePriceChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="quantity" defaultValue={quantity} onChange={handleQuantityChange} />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                { book && <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button> }
                { !book && <Button variant="primary" onClick={handleSaveChanges}>Create Book</Button> }
            </Modal.Footer>
        </Modal>
        </>
    );
    }

export default BookModal;