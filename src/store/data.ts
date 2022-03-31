import { createSlice } from "@reduxjs/toolkit";
import getMockData from "../helper/getMockData";
type LogType = {
	[key: string]: number[][];
};
const initialState: {
	logs: LogType;
	isTimer: boolean;
	timer: number;
} = getMockData();

const dataSlice = createSlice({
	name: "data",
	initialState: { ...initialState },
	reducers: {
		add(state, action) {
			const { date, start, end } = action.payload;
			const parts = date.split("-");
			const key = new Intl.DateTimeFormat("en-UK", {
				weekday: "short",
				year: "2-digit",
				month: "numeric",
				day: "numeric",
			}).format(new Date(+parts[0], +parts[1] - 1, +parts[2]));
			state.logs[key]
				? state.logs[key].push([start, end])
				: (state.logs[key] = [[start, end]]);
			state.logs[key].sort((a, b) => a[0] - b[0]);
			const newIntervals = [];
			let i = 0,
				j = 1;
			while (i < state.logs[key].length) {
				while (
					j < state.logs[key].length &&
					state.logs[key][i][1] >= state.logs[key][j][0]
				)
					state.logs[key][i][1] = Math.max(
						state.logs[key][j++][1],
						state.logs[key][i][1]
					);

				newIntervals.push(state.logs[key][i]);
				i = j++;
			}
			state.logs[key] = newIntervals;
		},
		toogleTimer(state) {
			state.isTimer = !state.isTimer;
			const now = new Date();
			state.timer = now.getHours() * 60 + now.getMinutes();
		},
		del(state, action) {
			const { date, index } = action.payload;
			state.logs[date] = state.logs[date].filter((_, i) => i !== index);
			!state.logs[date].length && delete state.logs[date];
		},
		edit(state, action) {
			const { date, index, newStart, newEnd } = action.payload;
			state.logs[date][index] = [newStart, newEnd];
			state.logs[date].sort((a, b) => a[0] - b[0]);
			const newIntervals = [];
			let i = 0,
				j = 1;
			while (i < state.logs[date].length) {
				while (
					j < state.logs[date].length &&
					state.logs[date][i][1] >= state.logs[date][j][0]
				)
					state.logs[date][i][1] = Math.max(
						state.logs[date][j++][1],
						state.logs[date][i][1]
					);

				newIntervals.push(state.logs[date][i]);
				i = j++;
			}
			state.logs[date] = newIntervals;
		},
	},
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
