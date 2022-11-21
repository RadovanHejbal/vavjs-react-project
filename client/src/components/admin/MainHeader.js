import Logout from "../buttons/Logout";
import classes from '../user/MainHeader.module.css';

const MainHeader = (props) => {
    const linkHandler = (data) => {
        props.changeUi(data);
    }

    return <nav className={classes.nav}>
        <h1>ADMIN</h1>
        <ul>
            <li className={classes.li}><button onClick={() => linkHandler("users")}>Users</button></li>
            <li className={classes.li}><button onClick={() => linkHandler("entertainment")}>Entertainment</button></li>
        </ul>
        <Logout />
    </nav>
}

export default MainHeader;