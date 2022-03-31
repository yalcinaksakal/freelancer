import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDuration, getTime } from "../../helper/getTime";
import { dataActions } from "../../store/data";
import styles from "./AddItem.module.scss";
import { RootState } from "../../store";
const AddItem: React.FC = () => {
	const dispatch = useDispatch(),
		today = new Date(),
		maxDate =
			today.getFullYear() +
			"-" +
			(today.getMonth() < 9 ? "0" : "") +
			(today.getMonth() + 1) +
			"-" +
			(today.getDate() < 10 ? "0" : "") +
			today.getDate(),
		[start, setStart] = useState(0),
		[end, setEnd] = useState(today.getHours() * 60 + today.getMinutes()),
		[date, setDate] = useState(maxDate),
		[err, setErr] = useState(""),
		{ timer, isTimer } = useSelector((state: RootState) => state.data),
		[log, setLog] = useState([""]);

	return (
		<>
			<div className={styles.add}>
				<label>
					Date
					<input
						type="date"
						value={date}
						autoFocus
						onChange={e => {
							setDate(e.target.value);
							setEnd(
								e.target.value === maxDate
									? today.getHours() * 60 + today.getMinutes()
									: 24 * 60 - 1
							);
						}}
						max={maxDate}
					></input>
				</label>
				<label>
					Start
					<input
						type="time"
						value={getTime(start)}
						autoFocus
						min="00:00"
						max="23:59"
						step={60}
						onChange={e => {
							setErr("");
							if (e.target.value === "n/a") return;
							const newVal = e.target.value.split(" ")[0].split(":"),
								val = +newVal[0] * 60 + +newVal[1];
							if (val >= end) {
								setErr("Start time can't be later than end time");
								return;
							}
							setStart(val);
						}}
					></input>
				</label>
				<label>
					End
					<input
						type="time"
						value={getTime(end)}
						onChange={e => {
							setErr("");
							if (e.target.value === "n/a") return;
							const newVal = e.target.value.split(" ")[0].split(":"),
								val = +newVal[0] * 60 + +newVal[1];
							if (val <= start) {
								setErr("End time can't be earlier than start time");
								return;
							}
							if (
								date === maxDate &&
								val >= today.getHours() * 60 + today.getMinutes()
							) {
								setErr("End time can't be later than now");
								return;
							}
							setEnd(val);
						}}
						min="00:00"
						max="23:59"
						step={60}
					></input>
				</label>
				<div style={{ color: "red", minHeight: "25px" }}>{err}</div>
				<button
					onClick={() => {
						dispatch(dataActions.add({ date, start, end }));
						setLog(prev => [
							...prev,
							date +
								" , " +
								getTime(start) +
								"-" +
								getTime(end) +
								" , " +
								getDuration(end - start) +
								" Added",
						]);
					}}
				>
					Add
				</button>
			</div>
			<h6 style={{ color: "dodgerblue", margin: "2.5rem 0 0 1rem" }}>
				START NEW RECORD
			</h6>
			<div className={styles.add}>
				<h2 style={{ color: "dodgerblue" }}>
					{isTimer ? "Started at " + getTime(timer) : ""}
				</h2>
				<button
					onClick={() => {
						if (isTimer) {
							const now = new Date(),
								endT = now.getHours() * 60 + now.getMinutes();
							if (endT - timer) {
								dispatch(
									dataActions.add({
										date: maxDate,
										start: timer,
										end: endT,
									})
								);
								setLog(prev => [
									...prev,
									maxDate +
										" , " +
										getTime(timer) +
										"-" +
										getTime(endT) +
										" , " +
										getDuration(endT - timer) +
										" Added",
								]);
							}
						}
						dispatch(dataActions.toogleTimer());
					}}
				>
					{isTimer ? "Finish" : "Begin"}
				</button>
				{isTimer && (
					<button
						onClick={() => {
							dispatch(dataActions.toogleTimer());
						}}
					>
						Cancel
					</button>
				)}
			</div>
			{log.map((l, i) => (
				<p
					key={i}
					style={{
						color: "green",
						fontSize: "10px",
						margin: "0",
						paddingLeft: "10px",
					}}
				>
					{l}
				</p>
			))}
		</>
	);
};

export default AddItem;
