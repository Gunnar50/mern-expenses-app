import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"



export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {email, password});
            alert("Registration Complete!");
            navigate("/login");
        } catch (err) {console.error(err);}

    }

	return (
		<div>
			<form onSubmit={onSubmit}>
                <h2 className="card-title">Sign Up</h2>
                <div className="form-group">
                    <input className="form-control" type="text" id="name" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="text" id="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" id="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button className="btn btn-primary" type="submit">Sign Up</button>
            </form>
		</div>
	)
}
