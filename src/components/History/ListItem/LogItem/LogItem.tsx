import { useState } from "react";
import { getDuration, getTime } from "../../../../helper/getTime";
import BackDrop from "../../../BackDrop";
import DeleteItem from "../../../DeleteItem/DeleteItem";
import EditItem from "../../../EditItem/EditItem";
import styles from "./LogItem.module.scss";

const LogItem: React.FC<{
	start: number;
	end: number;
	date: string;
	index: number;
}> = ({ start, end, date, index }) => {
	const [isDelete, setIsDelete] = useState(false),
		[isEdit, setIsEdit] = useState(false);
	return (
		<>
			{isDelete && (
				<BackDrop>
					<DeleteItem
						date={date}
						index={index}
						start={start}
						end={end}
						clicked={() => setIsDelete(false)}
					/>
				</BackDrop>
			)}
			{isEdit && (
				<BackDrop>
					<EditItem
						date={date}
						index={index}
						start={start}
						end={end}
						clicked={() => setIsEdit(false)}
					/>
				</BackDrop>
			)}
			<div className={styles.container}>
				<div>{`${getTime(start)} - ${getTime(end)} : ${getDuration(
					end - start
				)}`}</div>
				<div className={styles.buttons}>
					<button onClick={() => setIsEdit(true)}>Edit</button>
					<button onClick={() => setIsDelete(true)}>Delete</button>
				</div>
			</div>
		</>
	);
};

export default LogItem;
