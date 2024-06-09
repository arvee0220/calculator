import { useState } from "react";
import "./App.scss";

const App = () => {
	const [value, setValue] = useState("");

	const valueHandler = (e) => {
		e.preventDefault();
		setValue(value + e.target.value);
	};

	const resetHandler = () => {
		setValue("");
	};

	const deleteValue = () => {
		setValue(value.slice(0, -1));
	};

	const computeValue = () => {
		const expression = value.replace(/\^/g, "**");
		setValue(eval(expression));
	};

	return (
		<div className="container">
			<div className="calculator">
				<form action="">
					<div className="display">
						<input type="text" value={value} readOnly />
					</div>
					<div>
						<input type="button" value="AC" onClick={resetHandler} />
						<input type="button" value="DE" onClick={deleteValue} />
						<input type="button" value="." onClick={valueHandler} />
						<input type="button" value="/" onClick={valueHandler} />
					</div>
					<div>
						<input type="button" value="7" onClick={valueHandler} />
						<input type="button" value="8" onClick={valueHandler} />
						<input type="button" value="9" onClick={valueHandler} />
						<input type="button" value="*" onClick={valueHandler} />
					</div>
					<div>
						<input type="button" value="4" onClick={valueHandler} />
						<input type="button" value="5" onClick={valueHandler} />
						<input type="button" value="6" onClick={valueHandler} />
						<input type="button" value="+" onClick={valueHandler} />
					</div>
					<div>
						<input type="button" value="1" onClick={valueHandler} />
						<input type="button" value="2" onClick={valueHandler} />
						<input type="button" value="3" onClick={valueHandler} />
						<input type="button" value="-" onClick={valueHandler} />
					</div>
					<div>
						<input type="button" value="00" onClick={valueHandler} />
						<input type="button" value="0" onClick={valueHandler} />
						<input type="button" value="^" onClick={valueHandler} />
						<input className="equal" type="button" value="=" onClick={computeValue} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default App;
