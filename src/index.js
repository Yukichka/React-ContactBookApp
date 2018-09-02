import React from "react";
import ReactDOM from "react-dom";

import data1 from "./data.js";
//console.log(data)
class ContactBookApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: data1 };
    this.removeInfo = this.removeInfo.bind(this);
    this.removeInfoByButtonId = this.removeInfoByButtonId.bind(this);
    this.gdpr = this.gdpr.bind(this);
    this.showAge = this.showAge.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this.removeAll}>REMOVE EVERYONE</button>
        <hr />
        {this.state.data.map(info => {
          return (
            <div>
              <img
                src={info.picture}
                style={{ float: "left", padding: "1em" }}
              />
              <div>
                {info.name}
                {info.shouldShowAge ? <span>, age: {info.age}</span> : ""}
              </div>
              <div>{info.address}</div>
              <div>{info.phone}</div>
              <button
                onClick={function() {
                  this.removeInfo(info.guid);
                }.bind(this)}
              >
                Remove
              </button>
              <button data-id={info.guid} onClick={this.removeInfoByButtonId}>
                Remove by button id
              </button>

              <button onClick={() => this.gdpr(info.guid)}>GDPR it</button>

              <button onClick={() => this.catIt(info.guid)}>CAT it! 🐱</button>

              <button onClick={() => this.showAge(info.guid)}>
                {!info.shouldShowAge ? "Show age" : "Hide age"}
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }

  showAge(personId) {
    this.state.data.forEach(p => {
      if (p.guid == personId) {
        p.shouldShowAge = !p.shouldShowAge;
      }
    });
    this.setState({
      data: this.state.data
    });
  }
  catIt(personIdToCatifize) {
    this.state.data.forEach(p => {
      if (p.guid == personIdToCatifize) {
        p.picture = "https://placekitten.com/39/39";
        p.name = "Cat " + p.name;
      }
    });
    this.setState({
      data: this.state.data
    });
  }

  gdpr(id) {
    this.state.data.forEach(person => {
      if (person.guid == id) person.phone = "[REDUCTED]";
    });
    this.setState({
      data: this.state.data
    });
  }

  removeInfoByButtonId(e) {
    console.log(e.target.dataset.id);
    const newData = this.state.data.filter(o => o.guid != e.target.dataset.id);
    this.setState({
      data: newData
    });
  }

  removeInfo(guid) {
    console.log(guid);
    const newData = this.state.data.filter(o => o.guid != guid);
    this.setState({
      data: newData
    });
  }
  removeAll() {
    this.setState({
      data: []
    });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ContactBookApp />, rootElement);
