import React, {useState, useEffect} from 'react';
import HomeEventBox from './HomeEventBox';
import './Home.css';
import 'firebase/database';
import {database, storage} from '../firebase.js';


const Home = () =>{
    const [EventList, setEventList] = useState([]);
    useEffect(()=>{
      database.ref("event").once('value', function(snapshot){
        Object.values(snapshot.val()).forEach(value=>{
          storage.ref().child(value.imagesrc).getDownloadURL().then(function(url) {
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
      return () => {//Can't perform a React state update on an unmounted component에러를 해결하기 위해 cleanup 함수 사용
        console.log('cleanup 함수 사용');
      };
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