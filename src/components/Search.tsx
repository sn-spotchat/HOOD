import './Search.css';
import React, {useEffect, useState} from 'react';
import {fetchLocalAPI, ApiResult} from '../fetchLocalAPI';
import SearchIcon from '@material-ui/icons/Search';
import SearchBox from './SearchBox';
function Search(props: any) {
  
  const [apiResult, setApiResult] = useState<ApiResult | null>(null)
  const [keyword, setKeyword] = useState("");
  
  function handleChange(e:any){
    setKeyword(e.target.value);
  }

  function submitKeyword(event:any){
    event.preventDefault();
    const searchword = props.chatRoomName+" " +keyword;
    fetchLocalAPI(searchword).then((result) => {
      setApiResult(result);
    });
  }
  
  function submitOnEnter(event:any){
    if(event.which === 13 && !event.shiftKey){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
    }
  }

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
            <SearchBox title={item.title} category={item.category} roadAddress={item.roadAddress} mapx={item.mapx} mapy={item.mapy}></SearchBox>
          )
        })}
      </div>
      
    </div>
  );
}

export default Search;