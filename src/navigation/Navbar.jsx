import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { DataContext } from "../context/DataContext";
import { Button } from "../components/Button";

export const Navbar = () => {
  const { authState } = useContext(AuthContext);
  const { dataState } = useContext(DataContext);
  console.log(authState?.userDetails);
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to="/" className="logo-link">
          Luxuria
        </NavLink>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "nav-link navlink-active" : "nav-link"
            }
          >
            <i className="fas fa-magnifying-glass"></i>
            <span className="link-text">Search</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link navlink-active" : "nav-link"
            }
          >
            <i className="fas fa-shopping-bag"></i>
            <span className="link-text">Products</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "nav-link navlink-active" : "nav-link"
            }
          >
            <i className="fas fa-heart"></i>
            <span className="link-text">Wishlist</span>
            <span className="wishlist-count">
              {dataState?.wishlist?.length}
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "nav-link navlink-active" : "nav-link"
            }
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="link-text">Cart</span>
            <span className="cart-count">{dataState?.cart?.length}</span>
          </NavLink>
        </li>
        <li
          className={authState?.isLoggedin ? "nav-item-hoverles" : "nav-item"}
        >
          <NavLink
            to={authState?.isLoggedin ? "/logout" : "/login"}
            className={({ isActive }) =>
              isActive ? "nav-link navlink-active" : "nav-link"
            }
          >
            {!authState?.isLoggedin && <i className="fas fa-user"></i>}
            <span className="link-text">
              {authState?.isLoggedin ? (
                <span
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "4px 6px",
                    borderRadius: "3px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  {authState?.userDetails?.firstName}
                </span>
              ) : (
                "Account"
              )}
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
