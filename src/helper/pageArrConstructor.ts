const pageArrConstructor = (
	numberOfPages: number,
	currentPage: number
): (string | number)[] => {
	const pageArr = [];
	if (numberOfPages < 8)
		for (let i = 0; i < numberOfPages; i++) pageArr.push(i + 1);
	else if (currentPage < 5) {
		for (let i = 0; i < 5; i++) pageArr.push(i + 1);
		pageArr.push("...", numberOfPages);
	} else if (currentPage > numberOfPages - 4) {
		for (let i = numberOfPages - 5; i < numberOfPages; i++) pageArr.push(i + 1);
		pageArr.unshift(1, "...");
	} else {
		for (let i = currentPage - 1; i < currentPage + 2; i++) pageArr.push(i);
		pageArr.unshift(1, "...");
		pageArr.push("...", numberOfPages);
	}
	return pageArr;
};
export default pageArrConstructor;
