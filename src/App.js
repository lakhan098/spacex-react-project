import { Component, useState, useEffect } from "react";
import "./App.css";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  Routes,
  useParams,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launchpad/:id" element={<Launchpad />} />
      </Routes>
    </div>
  );
}

function Home() {
  const [launchpads, setlauchpads] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launchpads")
      .then((Response) => Response.json())
      .then((launchpads) => setlauchpads(launchpads));
    console.log(launchpads);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {launchpads.map((launchpads) => {
            return (
              <div className="col-sm-6">
                <div className="card" key={launchpads.id}>
                  <img
                    src={launchpads.images.large}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{launchpads.name}</h5>
                    <p className="card-text">
                      <h5>Details:</h5>
                      {launchpads.details}
                      <br></br>
                      <h5>Status:</h5>
                      {launchpads.status}
                    </p>
                    <p className="card-text">
                      <h5>Top launches:</h5>
                      
                      <div>
                        <ul>
                          <li>
                            <Link to={`/launchpad/${launchpads.launches[0]}`}>
                              {launchpads.launches[0]}
                            </Link>
                          </li>
                          <li>
                            <Link to={`/launchpad/${launchpads.launches[1]}`}>
                              {launchpads.launches[1]}
                            </Link>
                          </li>
                          <li>
                            <Link to={`/launchpad/${launchpads.launches[2]}`}>
                              {launchpads.launches[2]}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <p></p>
                        {launchpads.launches[0]}
                        <br></br>
                        <a href="page2.html">{launchpads.launches[1]}</a>
                        <br></br>
                        <a href="page2.html">{launchpads.launches[2]}</a> */}
                    </p>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Launchpad() {
  let { id } = useParams();
  let [launch, setLaunch] = useState(null);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches/${id}`)
      .then((Response) => Response.json())
      .then((launchpads) => setLaunch(launchpads));
  }, []);

  return (
    <div style={{ background: "white" }}>
      <p>This is Launch number:</p>
      <p>{id}</p>
      <p>Name:</p>
      {launch && <p>{launch.name}</p>}
      <p>details:</p>
      {launch && <p>{launch.details}</p>}
      <p>Date_utc:</p>
      {launch && <p>{launch.date_utc}</p>}
      <p>fairings Reused?:</p>
      {launch && <p>{launch.reused}</p>}
      <Link to={"/"}>Go Back</Link>
    </div>
  );
}

export default App;
