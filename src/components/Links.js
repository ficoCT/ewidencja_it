import {Link} from "react-router-dom";

function Links() {
  return (
    <div>
        <Link to="/login">Zaloguj</Link> {' '}
        <Link to="/register">Załóż konto</Link> {' '}
    </div>
  );
}

export default Links;
