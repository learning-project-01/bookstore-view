import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog/new");
  };

  return (
    <>
      <h1>Page Not Found</h1>
      <Button color="success" onClick={handleClick}>
        Go Back
      </Button>
    </>
  );
}
