import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './pages/home';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { CreateExpense } from './pages/create-expense';
import { CreateRoom } from './pages/create-room';
import { EditExpense } from './pages/edit-expense';
import { Room } from './pages/room';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/register' element={<Register/>} />
					<Route path='/login' element={<Login/>} />
					
					
				</Routes>
			</BrowserRouter>
		</div>
	);
  }

export default App;
