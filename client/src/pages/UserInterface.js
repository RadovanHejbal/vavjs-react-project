import MainHeader from '../components/user/MainHeader';
import Measurements from '../components/user/Measurements';
import MeasurementGraphs from '../components/user/MeasurementGraphs';
import { useState } from 'react';

const UserInterface = () => {
    const [page, setPage] = useState("Measurements");

    const changePageHandler = (data) => {
        setPage(data);
    }
    
    let generatePage = <Measurements />;
    if(page === "MeasurementGraphs") generatePage = <MeasurementGraphs />;

    return <div>
        <MainHeader changePage={changePageHandler} />
        {generatePage}
    </div>
}

export default UserInterface;