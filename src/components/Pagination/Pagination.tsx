import pageArrConstructor from "../../helper/pageArrConstructor";
import styles from "./Pagination.module.scss";

const Pagination: React.FC<{
	numberOfPages: number;
	currentPage: number;
	clicked: (page: number) => void;
}> = ({ numberOfPages, currentPage, clicked }) => {
	const pageArr = [...pageArrConstructor(numberOfPages, currentPage)];

	return (
		<div className={styles.pagination}>
			<div
				className={`${styles.page}  ${currentPage > 1 ? "" : styles.disabled}`}
				onClick={() => clicked(currentPage - 1)}
			>
				{"<"}
			</div>
			{pageArr.map((page, i) => (
				<div
					className={`${styles.page} ${
						page === currentPage ? styles.active : ""
					} ${page === "..." ? styles.disabled : ""}`}
					key={i}
					onClick={() => +page !== currentPage && clicked(+page)}
				>
					{page}
				</div>
			))}

			<div
				className={`${styles.page}  ${
					currentPage < numberOfPages ? "" : styles.disabled
				}`}
				onClick={() => clicked(currentPage + 1)}
			>
				{">"}
			</div>
		</div>
	);
};
export default Pagination;
