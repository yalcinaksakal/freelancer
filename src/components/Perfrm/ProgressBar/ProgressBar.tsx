import styles from "./ProgressBar.module.scss";

const ProgressBar: React.FC<{ width: number; heading: string }> = ({
	width,
	heading,
}) => {
	return (
		<>
			<h6 style={{ margin: "30px 20px 5px 20px" }}>{heading}</h6>
			<div className={styles.wrapper}>
				<div className={styles.progressBar}>
					<div
						className={styles.progressBarFill}
						style={{ width: width + "%" }}
					></div>
				</div>
			</div>
		</>
	);
};

export default ProgressBar;
