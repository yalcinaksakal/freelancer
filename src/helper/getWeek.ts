export const getWeek = function (year: number, month: number, day: number) {
	const date = new Date(year, month, day),
		week1 = new Date(date.getFullYear(), 0, 4);
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
	return (
		1 +
		Math.round(
			((date.getTime() - week1.getTime()) / 86400000 -
				3 +
				((week1.getDay() + 6) % 7)) /
				7
		)
	);
};
