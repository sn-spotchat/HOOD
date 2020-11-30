import './SearchTest.css';
import React, {useEffect, useState} from 'react';
//import {fetchLocalAPI, ApiResult} from './fetchLocalAPI';


function App() {
  const keyword = '김치'
//  const [apiResult, setApiResult] = useState<ApiResult | null>(null)

  /*useEffect(() => {
    fetchLocalAPI(keyword).then((result) => {
      setApiResult(result)
    });
  }, [])*/

  return (
    <div className="App" style={{maxWidth: 640, margin: '0 auto'}}>
      hello
    </div>
  );
}

export default SearchTest;
/*
<div className="App" style={{maxWidth: 640, margin: '0 auto'}}>
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
              </ul>
            </div>
          )
        })}
      </section>
    </div>
*/ 