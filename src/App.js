import Square from "./components/square";
import styled from "styled-components";
import { useEffect, useState } from "react";
import styles from './Ap.module.css'

function App() {
  const [data, setData] = useState(Array(9).fill(null));
  const [xPlayer, setxPlayer] = useState(true);
  const [winner, setWinner] = useState(null);
  const handlePlay = (index) => {
    if (winner || data[index]) return;
    const temp = data.slice();
    if (xPlayer) {
      temp[index] = "X";
    } else {
      temp[index] = "O";
    }
    setData(temp);
    setxPlayer(!xPlayer);
  };
  const handleReset = () => {
    setData(Array(9).fill(null));
    setxPlayer(xPlayer);
    setWinner(null);
  };

  useEffect(() => {
    const caculateWiner = () => {
      const winLine = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < winLine.length; i++) {
        const [a, b, c] = winLine[i];
        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
          setWinner({ winner: data[a], mstrix: [a, b, c] });
        } else if (data.filter((item) => item === null).length === 0) {
          setWinner({ winner: "Hòa" });
          return;
        }
      }
      return;
    };
    caculateWiner();
  }, [xPlayer, data]);
  return (
    <Container>
     {winner?.winner ?  <h1>{winner?.winner}</h1>  : null}
      <Header>
        <Board>
          {data.map((item, data) => (
            <Square 
              winner = {winner?.mstrix?.includes(data)}
              key={data}
              handlePlay={() => handlePlay(data)}
              value={item}
            />
          ))}
        </Board>
        <Click onClick={handleReset}>Chơi lại</Click>
      </Header>
    </Container>
  );
}

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 25px;
  height: 460px;
  width: 460px;
  text-align: center;
  cursor: pointer;
  padding: 20px;
`;
const position = styled.div`
  background-color: #ea4c89;
`;

const Click = styled.div`
  background-color: #ea4c89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  &:hover {
    background-color: #f082ac;
  }
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

const Container = styled.div`
  text-align: center;
`;
const Header = styled.header`
  background-color: rgb(252, 254, 254);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

export default App;
