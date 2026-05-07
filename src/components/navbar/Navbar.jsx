import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

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
          <li><Link to="/" onClick={closeMenu}>Início</Link></li>
          <li><Link to="/comunidade" onClick={closeMenu}>Comunidade</Link></li>
          <li><Link to="/contato" onClick={closeMenu}>Contato</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link to="/eventos" onClick={closeMenu}>Eventos</Link></li>
          <li><Link to="/suporte" onClick={closeMenu}>Suporte</Link></li>
        </ul>

        <div className="nav-auth">
          <Link to="/login" className="btn-login" onClick={closeMenu}>Entrar</Link>
          <Link to="/signup" className="btn-signup" onClick={closeMenu}>Criar Conta</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;