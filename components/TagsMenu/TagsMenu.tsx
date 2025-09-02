"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const tagList: string[] = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes
        {isOpen ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tagList.map((item) => (
            <li className={css.menuItem} key={item}>
              <Link
                onClick={toggle}
                className={css.menuLink}
                href={`/notes/filter/${item}`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
