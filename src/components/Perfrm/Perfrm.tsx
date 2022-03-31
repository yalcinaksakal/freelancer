import { useSelector } from "react-redux";

import { RootState } from "../../store";
import ProgressBar from "./ProgressBar/ProgressBar";
import { getDuration } from "../../helper/getTime";

const Perfrm: React.FC = () => {
	const logs = Object.entries(
			useSelector((state: RootState) => state.data).logs
		),
		getWeek = function (year: number, month: number, day: number) {
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
	let dSum = 0,
		days = 0;
	const monthSum: { [key: string]: number } = {},
		weekSum: { [key: string]: number } = {};

	logs.forEach(log => {
		const d = log[0].split(",")[1].split("/"),
			weekNo = getWeek(+d[2] + 2000, +d[1] - 1, +d[0]),
			sum = log[1].reduce((a, c) => a + c[1] - c[0], 0),
			monthKey = d[2] + "," + d[1],
			weekKey = d[2] + "," + weekNo;
		dSum += sum;
		days++;
		monthSum[monthKey]
			? (monthSum[monthKey] += sum)
			: (monthSum[monthKey] = sum);
		weekSum[weekKey] ? (weekSum[weekKey] += sum) : (weekSum[weekKey] = sum);
	});

	const dailyAvg = Math.floor(dSum / days),
		weekAvg = Math.floor(dSum / Object.keys(weekSum).length),
		monthAvg = Math.floor(dSum / Object.keys(monthSum).length);

	return (
		<>
			<ProgressBar
				heading={`Daily average is ${getDuration(
					dailyAvg
				)} per 24h (${days} days, ${
					Math.floor(dSum / 60) + "h " + (dSum % 60) + "m"
				} total time)`}
				width={(dailyAvg * 10) / (24 * 6)}
			/>

			<ProgressBar
				heading={`Weekly average is ${
					Math.floor(weekAvg / 60) + "h " + (weekAvg % 60) + "m"
				} per week, 7*24h`}
				width={(weekAvg * 10) / (24 * 6 * 7)}
			/>
			<ProgressBar
				heading={`Monthly average is ${
					Math.floor(monthAvg / 60) + "h " + (monthAvg % 60) + "m"
				} per month, 7*24*30h`}
				width={monthAvg / (24 * 6 * 3)}
			/>
		</>
	);
};

export default Perfrm;
