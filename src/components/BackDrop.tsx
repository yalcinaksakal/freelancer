import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("overlays") as HTMLElement;

const BackDrop: React.FC<{}> = ({ children }) => {
	const el = useRef(document.createElement("div"));
	useEffect(() => {
		// Use this in case CRA throws an error about react-hooks/exhaustive-deps
		const current = el.current;

		// We assume `modalRoot` exists with '!'
		modalRoot!.appendChild(current);
		return () => void modalRoot!.removeChild(current);
	}, []);

	return createPortal(
		<div
			style={{
				backgroundColor: "#00000074",
				height: "100vh",
				width: "100vw",
				position: "fixed",
				top: "0",
				left: "0",
				zIndex: "100",
			}}
		>
			{children}
		</div>,
		el.current
	);
};

export default BackDrop;
