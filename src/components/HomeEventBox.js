import React from 'react';
import './HomeEventBox.css';

/*
*목표: Home화면에 띄울 이벤트 박스를 생성
*내용: 이벤트 박스 안에는 이벤트에 관련된 이미지와 간단한 설명이 들어간다.
*firebase의 storage의 있는 이미지파일과 database의 저장된 행사 정보를 바탕으로 자동생성되게 한다.
*인자: 이미지, 해당 사이트 링크, content내용설명, 행사기간
*
*
*
*/
const HomeEventBox = (props) =>{
    return (
        <a href={props.url} target="_blank" rel="noopener noreferrer">
            <div className="EventRow">
                <div className="EventImg">
                    <img src={props.img} alt={props.name}></img>
                </div>
                <div className="EventDesc">
                    <div className="EventName">{props.name}</div>
                    <div className="EventContent">{props.content}</div>
                    <div className="EventTime">{props.date}</div>
                </div>
            </div>
        </a>
    );
};

export default HomeEventBox;