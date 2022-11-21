import { useState } from "react";
import MainHeader from "../components/admin/MainHeader";
import AdminUsers from "../components/admin/AdminUsers";
import AdminEntertainment from "../components/admin/AdminEntertainment";

const AdminInterface = () => {
    const [ui, setUi] = useState("users");

    const changeUiHandler = (data) => {
        setUi(data);
    }

    let generate = <AdminUsers />;
    if(ui === "entertainment") generate = <AdminEntertainment />;

    return <div>
        <MainHeader changeUi={changeUiHandler} />
        {generate}
    </div>
}

export default AdminInterface;