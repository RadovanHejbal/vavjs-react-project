import { Fragment, useContext } from "react";
import {AuthContext} from './context/AuthContext';
import AdminInterface from "./pages/AdminInterface";
import Auth from "./pages/Auth";
import UserInterface from "./pages/UserInterface";

function App() {
  const authContext = useContext(AuthContext);

  let generate = <Auth />;
  if(authContext.isAuth) generate = <UserInterface />;
  if(authContext.isAdmin) generate = <AdminInterface />;

  return (
    <Fragment>
      {generate}
    </Fragment>
  );
}

export default App;
