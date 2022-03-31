const getMockData = () => {
	const data = {
			logs: {},
			isTimer: false,
			timer: 0,
		},
		dateOptions = {
			weekday: "short",
			year: "2-digit",
			month: "numeric",
			day: "numeric",
		};
	let now = new Date(),
		start,
		end;
	now.setDate(now.getDate() - 1);
	for (let d = new Date(2021, 3, 1); d < now; d.setDate(d.getDate() + 1)) {
		start = Math.floor(Math.random() * 900);
		end = start + 15;
		for (let i = 0; i < 4; i++)
			if (!i || Math.random() > 0.5) {
				start = end + Math.floor(Math.random() * 360);
				if (start >= 24 * 60) continue;
				end = start + Math.floor(Math.random() * 420) + 60;
				if (end >= 24 * 60) end = 23 * 60 + 59;
				const key = new Intl.DateTimeFormat("en-UK", dateOptions).format(d);
				data.logs[key]
					? data.logs[key].push([start, end])
					: (data.logs[key] = [[start, end]]);
			}
	}

	return data;
};

export default getMockData;
