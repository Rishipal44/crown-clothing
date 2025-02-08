import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { signOut } from "firebase/auth";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assests/logo.svg";

const Header = ({ currentUser }) => {

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                { 
                  currentUser ? 
                  <div className="option" onClick={handleSignOut}>SIGN OUT</div> : 
                  <Link className="option" to='/signin'>SIGN IN</Link>
                }
            </div>
        </div>
    )
}

export default Header;