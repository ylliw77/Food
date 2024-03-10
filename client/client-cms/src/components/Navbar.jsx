import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const nav = useNavigate()
  function handleLogout(e) {
    e.preventDefault()
    localStorage.clear();
    nav('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/dash" className="navbar-brand">
            DASHMIN
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="category">
                  CATEGORIES
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="add-staff">
                  REGISTER STAFF
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleLogout}>
              <button className="btn btn-warning" href="" type="submit">
                Log out
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
