import classes from './Logout.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const Logout = () => {
    const authContext = useContext(AuthContext);

    return <button className={classes.logout} onClick={authContext.logout}>Logout</button>
}

export default Logout;