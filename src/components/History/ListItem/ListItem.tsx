import { getDuration } from "../../../helper/getTime";
import styles from "./ListItem.module.scss";
import LogItem from "./LogItem/LogItem";

const ListItem: React.FC<{
	item: any;
	index: number;
}> = ({ item, index }) => {
	const duration =
			item[1] === "Total"
				? 0
				: item[1].reduce((a: number, c: number[]) => a + c[1] - c[0], 0),
		total = index ? getDuration(duration) : "Total",
		style = {
			"--backColor": index % 2 ? "#eff5fb" : "#dce8fa",
			"--color": duration >= 480 ? "green" : "red",
		} as React.CSSProperties;

	return (
		<li className={index ? styles.item : styles.heading} style={style}>
			<div className={styles.no}>{index ? index : ""}</div>
			<div className={styles.name}>
				<div>{item[0]}</div>
				{item[1] !== "Total" &&
					item[1].map((log: any, i: number) => (
						<LogItem
							key={item[0] + i}
							start={log[0]}
							end={log[1]}
							date={item[0]}
							index={i}
						/>
					))}
			</div>

			<div className={styles.total}>{total}</div>
		</li>
	);
};

export default ListItem;
