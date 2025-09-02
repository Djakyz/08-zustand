import Link from "next/link";
import css from "./Sidebar.module.css";

const NoteSidebarList: string[] = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

const Sidebar = () => {
  return (
    <ul className={css.menuList}>
      {NoteSidebarList.map((item) => (
        <li className={css.menuItem} key={item}>
          <Link className={css.menuLink} href={`/notes/filter/${item}`}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
