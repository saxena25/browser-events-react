import axios from 'axios';
import {useState, useEffect} from 'react';
import "./Events.css";

function Events() {
    let[data,setData] = useState([]);
    let[page,setPage] = useState(1)
    let[coordinates, setCoordinates] = useState({x: 0, y: 0});
    // let URL = 'https://reqres.in/api/users'

    const DisplayData = async()=>{
        try {
            let res = await axios.get(`https://reqres.in/api/users?page=${page}&limit=10`);
            // console.log(res.data.data);
            setData(res.data.data);
        } catch (error) {
            console.log(`error while Fetching data ${error}`);
        }
    }

    const handleMove = (e) =>{
        setCoordinates({
            x: e.clientX,
            y: e.clientY
        })
    }

    useEffect(() => {
        DisplayData()
    }, [page]);


    return ( 
        <div onMouseMove={handleMove}>
            <h2>X:{coordinates.x}, Y:{coordinates.y}</h2>
            <h1>Fetching Data</h1>
            <div className='pagination'>
                <button onClick={()=>setPage(page - 1)} className='btn'>Prev Page</button>
                <p>{page}</p>
                <button onClick={()=>setPage(page + 1)} className='btn'>Next Page</button>
            </div>
            <div className='users'>
                {data.map((user)=>(
                    <div key={user.id} className='user'>
                        <img src={user.avatar} alt="" />
                        <p><b>Name: </b>{user.first_name} {user.last_name}</p>
                        <p><b>Email: {user.email}</b></p>
                    </div>
                ))}
            </div>
        </div>
     );
}

export default Events;