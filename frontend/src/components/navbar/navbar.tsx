import { FaHome, FaImages } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from './../../assets/logo.png';
import "./navbar.scss";

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <img src={logo} />
            </div>
            <ul className="navigation-menu">
                <li>
                    <FaHome />
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <FaImages />
                    <Link to={"images"}>Images</Link>
                </li>
            </ul>
        </nav>
    );
};
  
export default Navbar;  