import {useState, useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie"
import {useNavigate} from "react-router-dom"



export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const navigate = useNavigate();
    const [, setCookies] = useCookies(["access_token"])

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", { email, password });
            
            const token = response.data.token;
            const userID = response.data.userID;

            // Immediately verify token after successful login
            const verifyResponse = await axios.get("http://localhost:3001/auth/verify-token", {
                headers: { 'Authorization': token }
            });

            if (!verifyResponse.data.valid) {
                console.log('Token verification failed!');
                return;
            }

            setCookies("access_token", token);
            window.localStorage.setItem("userID", userID);
            navigate("/");

        } catch (err) {
            console.error(err);
            alert(err.response ? err.response.data.message : "Error occurred during login.");
        }
    }


	return (
		<div>
			<form onSubmit={onSubmit}>
				<h2 className="card-title">Sign In</h2>
				<div className="form-group">
					<input className="form-control" type="text" id="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
				</div>
				<div className="form-group">
					<input className="form-control" type="password" id="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
				</div>
				<button className="btn btn-primary" type="submit">Sign In</button>
        	</form>
		</div>
	)
}
