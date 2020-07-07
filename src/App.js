import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [gitUser, setUser] = useState('smabdullah');

  useEffect(()=>{
    fetch(`https://api.github.com/users/${gitUser}`)
    .then(res => res.json())
    .then(setData)
    .catch(<h1>No User found</h1>)
  }
  ,[gitUser]);

  if(data){
    const getData = !data.hasOwnProperty('message');
    const success = () => {
      return(
      <div>
        <h1>{data.name}</h1>
        <p>{data.bio}</p>
        <h2>Works in: {data.company}</h2>
        <h3>Based on: {data.location}</h3>
        <img src = {data.avatar_url} width={150} alt=''/>
      </div>
      );
    }

    const noData = () => {
      return(
      <div>
      <h3> No data found. Please provide a valid login name </h3>
    </div>
      );
    }
    const content = getData ? success() : noData();
    return (
      <>
        <div>
          <h2> Search the details of a Git user</h2>
          <label>Login name</label>
          <input id='data' placeholder='user name...' autoFocus onKeyUp={e=>{
            if(e.keyCode === 13){setUser(document.getElementById('data').value)}}}>
          </input>
        </div>
          {content}    
      </>
    );
  }
return null;
}

export default App;
