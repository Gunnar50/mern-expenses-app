import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"



export const CreateRoom = () => {
	const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/room/add", {title});
            alert("Room Created!");
        } catch (err) {console.error(err);}

    }

	return (
		<div>
			<form onSubmit={onSubmit}>
                <h2 className="card-title">Create Room</h2>
                <div className="form-group">
                    <input className="form-control" type="text" id="title" placeholder="Room Title" onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <button className="btn btn-primary" type="submit">Create</button>
            </form>
		</div>
	)
}
