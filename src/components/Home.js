import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import HomeEventBox from './HomeEventBox';
import './Home.css';
import 'firebase/database';
import {database, storage} from '../firebase.js';


const Home = () =>{
    const [EventList, setEventList] = useState([]);
    const user = useSelector(state => state.userreducer.profile.name); 
    var storageRef = storage.ref();
    useEffect(()=>{
      database.ref("event").once('value', function(snapshot){
        Object.values(snapshot.val()).forEach(value=>{
          storageRef.child(value.imagesrc).getDownloadURL().then(function(url) {
            setEventList(oldList => [...oldList, {
            img: url,
            content: value.content,
            date: value.date,
            name: value.name,
            url: value.url
          }]);
          }).catch(function(error) {
            console.log(error);
          });
          
        });
        
      });
    },[])
    
    return (
        <div>
            <div id="homehead" className="head">Home</div>
            <div id="homebody" className="body">
              {EventList.map((element, index) => {
                  return (
                    <HomeEventBox  key={index} img={element.img} content={element.content} date={element.date} name={element.name} url={element.url}></HomeEventBox>
                  )
              })}
            </div>
        </div>
    );
};

export default Home;