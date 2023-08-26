import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export const CreateExpense = () => {
	const [expense, setExpense] = useState({
		title: "",
		price: 0,
		paid_by: 0,
		participants: [],
	});
    const navigate = useNavigate();

	const getUsersInRoom = async() => {
		try {
            const result = await axios.get("http://localhost:3001/room/get-users/roomid");
			return result;
			// return list of users
        } catch (err) {console.error(err);}
	};

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/expense/add", {expense});
            alert("Expense Created!");
        } catch (err) {console.error(err);}

    }

	return (
		<div>
			<form onSubmit={onSubmit}>
                <h2 className="card-title">Create Expense</h2>

                <div className="form-group">
                    <input className="form-control" type="text" id="title" placeholder="Expense Title" onChange={(event) => setExpense(event.target.value)} required/>
                </div>

				<div className="form-group">
                    <input className="form-control" type="number" id="price" placeholder="Price" onChange={(event) => setExpense(event.target.value)} required/>
                </div>

				<div className="form-group">
                    <select className="form-control" id="paid-by" placeholder="Paid By" onChange={(event) => setExpense(event.target.value)} required>
						<option>user1</option>
						<option>user2</option>
					</select>
                </div>

				{/* need to add the list of participants */}
				
                <button className="btn btn-primary" type="submit">Create</button>
            </form>
		</div>
	)
}
