import React, {Component} from 'react';
import './Content.css';

class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSidebarExpanded: true,
      searchTxt: ''
    };

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  sidebarExpanded = () => (
    <div className="sidebar">
      <span
        role="presentation"
        onClick={() => this.setState({ isSidebarExpanded: false })}
      >
      접기
      </span>
      <div className="searchBar">
        <form action="/" method="POST"
          onSubmit={function(e){
          e.preventDefault();
          this.setState({searchTxt:e.target.search.value});
        }.bind(this)}>
          <input type="text" name="search" placeholder="검색" size="30"></input>
          <input type="submit" value="검색"></input>
        </form>
      </div>
      <div className="searchResult">
        검색결과
      </div>
    </div>
  );

  sidebarCollapsed = () => (
    <div className="sidebar collapsed">
      <span
        role="presentation"
        onClick={() =>
          this.setState({
            isSidebarExpanded: true
          })
        }
      >
      펼치기
      </span>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  );

  render() {
    const { isSidebarExpanded } = this.state;
    return (
        <div className="content">
        {isSidebarExpanded && this.sidebarExpanded()}
        {isSidebarExpanded || this.sidebarCollapsed()}
        
      </div>
    )
  }
}

export default Content;
