import todosBoardStyles from "../styles/TodosBoard.module.css";
import moment from "moment";
import TodoItem from "../components/TodoItem";

const TodoBoard = ({ todos, todosDate }) => {
  //check if date is past
  const todayDate = moment(new Date());
  const dateDiff = moment(todosDate).diff(todayDate, "days");

  return (
    <>
      <p style={dateDiff < 0 ? { color: "grey" } : null}>{todosDate}</p>
      <input type="text" />
      <div className={todosBoardStyles.todos}>
        {todos.map((todo, i) => {
          return <TodoItem key={i} todo={todo} />;
        })}
      </div>
      <div>
        {[...Array(14 - todos.length + 1)].map((line) => {
          return <li key={line}></li>;
        })}
      </div>
    </>
  );
};

export default TodoBoard;
