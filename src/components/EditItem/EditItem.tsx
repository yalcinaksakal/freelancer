import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDuration, getTime } from "../../helper/getTime";
import { dataActions } from "../../store/data";
import styles from "./EditItem.module.scss";

const EditItem: React.FC<{
	date: string;
	index: number;
	start: number;
	end: number;
	clicked: () => void;
}> = ({ date, index, start, end, clicked }) => {
	const dispatch = useDispatch(),
		[newStart, setNewStart] = useState(start),
		[newEnd, setNewEnd] = useState(end),
		[err, setErr] = useState("");

	return (
		<div className={styles.edit}>
			<label>
				Start
				<input
					type="time"
					value={getTime(newStart)}
					autoFocus
					onChange={e => {
						setErr("");
						const newVal = e.target.value.split(" ")[0].split(":"),
							val = +newVal[0] * 60 + +newVal[1];
						if (val >= newEnd) {
							setErr("Start time can't be later than end time");
							return;
						}
						setNewStart(val);
					}}
					min="00:00"
					max="23:59"
					step={60}
				></input>
			</label>
			<label>
				End
				<input
					type="time"
					value={getTime(newEnd)}
					onChange={e => {
						setErr("");
						if (e.target.value === "n/a") return;
						const newVal = e.target.value.split(" ")[0].split(":"),
							val = +newVal[0] * 60 + +newVal[1];
						if (val <= newStart) {
							setErr("End time can't be earlier than start time");
							return;
						}
						setNewEnd(val);
					}}
					min="00:00"
					max="23:59"
					step={60}
				></input>
			</label>
			<div style={{ color: "red", minHeight: "25px" }}>{err}</div>
			<p>
				Edit the work log at {date}, {getTime(start)}-{getTime(end)},{" "}
				{getDuration(end - start)}.
			</p>

			<div>
				<button onClick={() => clicked()}>Cancel</button>
				<button
					onClick={() => {
						dispatch(dataActions.edit({ date, index, newStart, newEnd }));
						clicked();
					}}
				>
					Edit
				</button>
			</div>
		</div>
	);
};

export default EditItem;
