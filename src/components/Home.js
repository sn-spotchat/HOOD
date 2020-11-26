import React from 'react';
import {useSelector} from 'react-redux';
import './Home.css';


const Home = () =>{
    const user = useSelector(state => state.userreducer.profile.name); 

    return (
        <div>
            <div id="homehead" className="head">Home</div>
            <div id="homebody" className="body">
                {JSON.stringify(user)}
            </div>
        </div>
    );
};

export default Home;