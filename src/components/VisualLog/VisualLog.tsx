import TimeSlot from "./TimeSlot/TimeSlot";
import styles from "./VisualLog.module.scss";

const VisualLog: React.FC<{
	logs: any;
	activeSlot: number;
}> = ({ logs, activeSlot }) => {
	return (
		<div className={styles.visual}>
			<TimeSlot start={0} end={24 * 60} isActive={false} />
			{logs.map((log: any, i: number) => (
				<TimeSlot
					key={i}
					start={log[0]}
					end={log[1]}
					isActive={i === activeSlot}
				/>
			))}
			<ul className={styles.digits}>
				<li>0</li>
				<li>6</li>
				<li>12</li>
				<li>18</li>
			</ul>
		</div>
	);
};

export default VisualLog;
