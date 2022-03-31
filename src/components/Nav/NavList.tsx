import styles from "./NavList.module.scss";
import NavItem from "./NavItem/NavItem";

import { SVGS } from "../../svg/svg";

const NavList: React.FC<{ clicked: (nav: string) => void; cur: string }> = ({
	clicked,
	cur,
}) => {
	return (
		<div className={styles.nav}>
			<ul className={styles.list}>
				{Object.values(SVGS).map((listItem, index) => {
					return (
						<NavItem
							key={index}
							item={listItem.name}
							svg={listItem.svg}
							desc={listItem.description}
							isActive={cur === listItem.name}
							clicked={clicked}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default NavList;
