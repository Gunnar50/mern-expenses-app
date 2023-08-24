import {useState, useEffect} from "react";
import axios from "axios";



export const Register = () => {
	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={onSubmit}>
            <h2 className="card-title">{label}</h2>
            <div className="form-group">
                <input className="form-control" type="text" id="username" placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
                <input className="form-control" type="password" id="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button className="btn btn-primary" type="submit">{label}</button>
        </form>
		</div>
	)
}
