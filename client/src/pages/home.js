import {useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


export const Home = () => {
	return (
		<div>
			<h1>Share Expenses</h1>
			<div className="nav">
				<Link className="nav-button" to="/register">Sign Up</Link>
				<Link className="nav-button" to="/login">Login</Link>
			</div>
		</div>
	)
}
