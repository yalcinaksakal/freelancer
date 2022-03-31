import { useDispatch } from "react-redux";
import { getDuration, getTime } from "../../helper/getTime";
import { dataActions } from "../../store/data";
import styles from "./DeleteItem.module.scss";

const DeleteItem: React.FC<{
	date: string;
	index: number;
	start: number;
	end: number;
	clicked: () => void;
}> = ({ date, index, start, end, clicked }) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.delete}>
			<p>
				Are you sure to delete the work log at {date}, {getTime(start)}-
				{getTime(end)}, {getDuration(end - start)} ?
			</p>
			<button onClick={() => clicked()}>Cancel</button>
			<button
				onClick={() => {
					dispatch(dataActions.del({ date, index }));
					clicked();
				}}
			>
				Delete
			</button>
		</div>
	);
};

export default DeleteItem;
