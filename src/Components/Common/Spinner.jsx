import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className="centered-div">
		<Spinner animation="border" role="status" />
    </div>
  );
}

export default LoadingSpinner;