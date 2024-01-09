import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function UserCard({ user, type, onDelete }) {

    const cardStyle = {
        width: type !== "dashboard" ? '18rem' : 'auto',
    };

    const { handleFetch: deleteUser } = useAPIFetch({
        url: getUrl({ 
            endpoint: "USER_DETAILS", 
            pathParams: { user_id: user.id }
        }), 
        method: "DELETE"
    })

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            deleteUser()
            .then((deletedUser) => {
                if(deletedUser) {
                    console.log("User [" + deletedUser.email + "] correctly deleted!")
                    alert("User [" + deletedUser.email + "] correctly deleted!");
                    onDelete(deletedUser.id);
                } else {
                    alert("Error while deleting user [" + user.email + "]. Check console for more details.");
                }
            });
        }
    }

    return (
        <Card style={cardStyle}>
            <img alt="Profile" width="50px" style={{padding: "5px", borderRadius: "10px"}} src={user.picture} />
            <Card.Body>
                <Card.Title>{user.name + " " + user.surname}</Card.Title>
                <Card.Text><b>User ID: </b>{user.id}</Card.Text>
                <Card.Text>{user.email}</Card.Text>
            </Card.Body>
            <Card.Footer><b>Role: </b>{user.role.name_translated}</Card.Footer>
            { type === "dashboard" &&  
                <Card.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Card.Footer> 
            }
        </Card>
    );
}

export default UserCard;