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
        {data.name && <h2>{data.name}</h2>}
        {data.bio && <p>{data.bio}</p>}
        {data.company && <h3>Works in: {data.company}</h3>}
        {data.location && <h3>Based on: {data.location}</h3>}
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
          <h2>Search the details of a Git user</h2>
          <div>
            <div><input type="text" id="data" autoFocus placeholder="login name..." onKeyUp={e=>{
              if(e.keyCode === 13)
              {
                setUser(document.getElementById('data').value)
                document.getElementById('data').value = ''

              }
              }}>
            </input></div>
          </div>
        </div>
          {content}    
      </>
    );
  }
return null;
}

export default App;
