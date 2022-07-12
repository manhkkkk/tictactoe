import React from "react";
import styles from "./Square.module.css";


export const Square = (props) => {
  const winner = props.winner
  return (
    <button className={` ${winner ? styles.position : styles.button}`} onClick={props.handlePlay}>
      {props.value}
    </button>
  );
};

export default Square;

