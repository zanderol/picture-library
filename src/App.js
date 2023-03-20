import React from "react";
import { Collection } from "./Collection";
import "./index.scss";

function App() {
  const [categoryIs, setCategoryId] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    fetch("https://6418691c29e7e36438e7fcd9.mockapi.io/picture-library")
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("An error during getting responce from server");
      });
  }, []);

  return (
    <div className="App">
      <h1>My pictures collection</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">All</li>
          <li>Mountains</li>
          <li>Ocean</li>
          <li>Architecture</li>
          <li>Cities</li>
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {collections
          .filter((obj) => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
