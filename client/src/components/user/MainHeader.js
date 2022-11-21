import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import classes from './MainHeader.module.css';
import Logout from '../buttons/Logout';

const MainHeader = (props) => {
    const authContext = useContext(AuthContext);

    const pageChangeGraphs = () => {
        props.changePage("MeasurementGraphs");
    }

    const pageChangeMeasurements = () => {
        props.changePage("Measurements");
    }

    return <nav className={classes.nav}>
        <h1>{authContext.username}</h1>
        <ul>
            <li className={classes.li}><button onClick={pageChangeMeasurements}>Home - measurements</button></li>
            <li className={classes.li}><button onClick={pageChangeGraphs}>Measurement Graphs</button></li>
        </ul>
        <Logout />
    </nav>
}

export default MainHeader;