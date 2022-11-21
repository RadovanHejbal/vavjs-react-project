import classes from './AdminUsers.module.css';

const SingleUser = (props) => {
    const removeUserHandler = () => {
        props.removeUser(props.user.id);
    }

    return <div className={classes.single}>
        <h1 className={classes.h1}>{props.user.username}</h1>
        <div><label className={classes.label}>id: </label>{props.user.id}</div>
        <div><label className={classes.label}>email: </label>{props.user.email}</div>
        <div><label className={classes.label}>password: </label>{props.user.password}</div>
        <div><label className={classes.label}>height: </label>{props.user.height}</div>
        <div><label className={classes.label}>age: </label>{props.user.age}</div>
        <button onClick={removeUserHandler}>Remove user</button>
    </div>
}

export default SingleUser;