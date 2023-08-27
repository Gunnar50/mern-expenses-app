import {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";



export const Room = () => {
	const roomID = useParams();
	const [room, setRoom] = useState(null);

	useEffect(() => {
		const getRoom = () => {

		}

		getRoom();
	}, [])

	if (!room) return null;
	
	return (
		<div>
			<h1>Room Title</h1>
			<div className="navigation">
				<Link>Balance</Link>
				<button>Add Expense</button>
			</div>
			<div className="expenses-list">
				
			</div>
		</div>
	)
}
