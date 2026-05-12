import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const closeMenu = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogged(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img className="logo" src="images/icon.png" alt="Logo" />
        </Link>
      </div>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "active-bar1" : ""}`}></span>
        <span className={`bar ${isOpen ? "active-bar2" : ""}`}></span>
        <span className={`bar ${isOpen ? "active-bar3" : ""}`}></span>
      </div>

      <div className={`nav-menu ${isOpen ? "active" : ""}`}>
        <ul className="nav-items">
          <li>
            <Link to="/" onClick={closeMenu}>
              Início
            </Link>
          </li>
          <li>
            <Link to="/comunidade" onClick={closeMenu}>
              Comunidade
            </Link>
          </li>
          <li>
            <Link to="/contato" onClick={closeMenu}>
              Contato
            </Link>
          </li>
          <li>
            <Link to="/blog" onClick={closeMenu}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/eventos" onClick={closeMenu}>
              Eventos
            </Link>
          </li>
          <li>
            <Link to="/suporte" onClick={closeMenu}>
              Suporte
            </Link>
          </li>
        </ul>

        <div className="nav-auth">
          {isLogged ? (
            <button
              className="btn-signup"
              onClick={handleLogout}
              style={{ backgroundColor: "#ff4d4d" }}
            >
              Sair
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-login" onClick={closeMenu}>
                Entrar
              </Link>

              <div className="dropdown-container">
                <button className="btn-signup" onClick={toggleDropdown}>
                  Criar Conta
                  <span className={`arrow ${dropdownOpen ? "up" : ""}`}></span>
                </button>

                <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link to="/institution-signup" onClick={closeMenu}>
                      Criar Instituição
                    </Link>
                  </li>
                  <li>
                    <Link to="/adopter-signup" onClick={closeMenu}>
                      Criar Adotante
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
