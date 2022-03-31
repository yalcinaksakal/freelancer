import styles from "./History.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { itemsPerPage } from "../../config/config";
import { useState } from "react";
import ListItem from "./ListItem/ListItem";
import Pagination from "../Pagination/Pagination";

const History: React.FC = () => {
	const logs = Object.entries(
			useSelector((state: RootState) => state.data).logs
		).sort((a, b) => {
			const d1 = a[0].split(",")[1].split("/"),
				d2 = b[0].split(",")[1].split("/");
			if (+d2[2] < +d1[2]) return -1;
			if (+d2[2] === +d1[2] && +d2[1] < +d1[1]) return -1;
			if (+d2[2] === +d1[2] && +d2[1] === +d1[1] && +d2[0] < +d1[0]) return -1;
			return 0;
		}),
		numOfItems = logs.length,
		numOfPages = Math.ceil(numOfItems / itemsPerPage),
		[curPage, setCurPage] = useState(1),
		itemsInPage = logs.slice(
			(curPage - 1) * itemsPerPage,
			curPage * itemsPerPage
		),
		changePage = (page: number) => setCurPage(page);

	return (
		<div className={styles.container}>
			{numOfPages > 1 && (
				<Pagination
					numberOfPages={numOfPages}
					currentPage={curPage}
					clicked={changePage}
				/>
			)}

			<ul className={styles.list}>
				<ListItem index={0} item={["Date", "Total"]} />
				{logs.length ? (
					itemsInPage.map((item, i) => (
						<ListItem
							key={i}
							index={itemsPerPage * (curPage - 1) + i + 1}
							item={item}
						/>
					))
				) : (
					<p style={{ color: "red" }}>There is not any log</p>
				)}
			</ul>
		</div>
	);
};

export default History;
