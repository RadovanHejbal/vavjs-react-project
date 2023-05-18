/*
  Radovan Hejbal
*/

import { Fragment, useContext, useEffect } from "react";
import {AuthContext} from './context/AuthContext';
import AdminInterface from "./pages/AdminInterface";
import Auth from "./pages/Auth";
import UserInterface from "./pages/UserInterface";
import axios from "axios";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios.post("/inicialize", {});
  }, [])

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
