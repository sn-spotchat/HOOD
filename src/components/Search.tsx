import './Search.css';
import React, {useEffect, useState} from 'react';
import {fetchLocalAPI, ApiResult} from '../fetchLocalAPI';
import SearchIcon from '@material-ui/icons/Search';

function Search(props: any) {
  
  const [apiResult, setApiResult] = useState<ApiResult | null>(null)
  const [keyword, setKeyword] = useState("");
  
  function handleChange(e:any){
    setKeyword(e.target.value);
    console.log(keyword);
  }

  function submitKeyword(event:any){
    event.preventDefault();
    const searchword = props.chatRoomName+" " +keyword;
    fetchLocalAPI(searchword).then((result) => {
      setApiResult(result);
      console.log(searchword);
      console.log(result);
    });
  }
  
  function submitOnEnter(event:any){
    if(event.which === 13 && !event.shiftKey){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
        console.log("ender");
    }
  }
  useEffect(() => {
    
  }, [])
  return (
    <div className="Search" style={{maxWidth: 640, margin: '0 auto'}}>
      <form id="SearchHead" onSubmit={submitKeyword}>
        <div id="SearchLine">
            <button id="SearchButton" type="submit"><SearchIcon></SearchIcon></button>
            <input onChange={handleChange} placeholder="검색어" onKeyPress={submitOnEnter}></input>
        </div>
      </form>
      <div id="SearchBody">
      {apiResult?.items?.map(item => {
          return (
            <div>
              <header>
                <div
                  style={{fontSize: '1.4em'}}
                  dangerouslySetInnerHTML={{__html: item.title}}
                />
              </header>
              <ul>
                <li>{item.category}</li>
                <li>{item.roadAddress}</li>
                <li>{item.mapx}</li>
                <li>{item.mapy}</li>
              </ul>
            </div>
          )
        })}
      </div>
      
    </div>
  );
}

export default Search;
/*
<header style={{marginBottom: '4rem'}}>
        <h1>네이버 지역검색 OPEN API proxy 연동 예제</h1>
        <small>키워드: <b>{keyword}</b></small>
      </header>
      <section style={{textAlign: 'left'}}>
        {apiResult?.items?.map(item => {
          return (
            <div>
              <header>
                <div
                  style={{fontSize: '1.4em'}}
                  dangerouslySetInnerHTML={{__html: item.title}}
                />
              </header>
              <ul>
                <li>{item.category}</li>
                <li>{item.roadAddress}</li>
                <li>{item.mapx}</li>
                <li>{item.mapy}</li>
              </ul>
            </div>
          )
        })}
      </section>
*/