import TodoDate from "./TodoDate";
import TodoList from "./TodoList";
import TodoAddForm from "./TodoAddForm";
import DummyLines from "./DummyLines";
import Loader from "./Loader";
import { connect } from "react-redux";
import * as todosActions from "../redux/todos/todosActions";
import { useEffect, useState } from "react";

const TodoPage = ({
  formatedDate,
  datePlus,
  loading,
  error,
  allTodos,
  currentUser,
  deleteTodo,
  updateTodo,
  fetchTodos,
  addTodo,
}) => {
  const [newTodo, setNewTodo] = useState("");

  const todosObject = allTodos.filter((data) => data.date === formatedDate);
  const [datesToUpdate, setDatesToUpdate] = useState([]);

  useEffect(() => {
    console.log(datesToUpdate);
  }, [datesToUpdate]);

  useEffect(() => {
    setNewTodo("");
    if (!todosObject[0]?.date) {
      fetchTodos(currentUser, formatedDate);
    }
  }, []);

  const DeleteTodo = (todoValue) => {
    deleteTodo(currentUser, formatedDate, allTodos, todoValue);
  };

  const UpdateTodo = (todoValue) => {
    updateTodo(currentUser, formatedDate, allTodos, todoValue);
  };

  const AddNewTodo = (e) => {
    e.preventDefault();
    if (
      newTodo.trim() !== "" &&
      todosObject[0]?.todos.findIndex((todo) => todo.value === newTodo) < 0
    ) {
      addTodo(currentUser, formatedDate, allTodos, newTodo);
      setNewTodo("");
    }
  };

  const DragOverAction = (e) => {
    e.preventDefault();

    const draggedItem = document.querySelector(".dragging");

    //draggedFromDate
    const draggedFromDate = draggedItem.parentElement.parentElement
      .querySelector(".todo--date")
      .querySelector("p").innerText;
    //push to date to update array if already not there
    const draggedFromDateExists = datesToUpdate.findIndex(
      (date) => date === draggedFromDate
    );
    if (draggedFromDateExists < 0) setDatesToUpdate([draggedFromDate]);

    //push to dragged container

    const todoList = e.currentTarget.querySelector(".todo--list");
    const draggedToDate = e.currentTarget
      .querySelector(".todo--date")
      .querySelector("p").innerText;

    todoList.appendChild(draggedItem);
    //push to date to update if not there
    const draggedToDateExists = datesToUpdate.findIndex(
      (date) => date === draggedToDate
    );
    if (draggedToDateExists < 0)
      setDatesToUpdate((prev) => [...prev, draggedToDate]);
  };

  return (
    <main className="todo--page container" onDragOver={DragOverAction}>
      {loading ? <Loader /> : null}
      <TodoDate formatedDate={formatedDate} datePlus={datePlus} />
      <TodoList
        todos={todosObject[0]?.todos || []}
        UpdateTodo={UpdateTodo}
        DeleteTodo={DeleteTodo}
      />
      {todosObject[0]?.todos.length === 12 ? null : (
        <TodoAddForm
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          AddTodo={AddNewTodo}
        />
      )}
      <DummyLines todosLength={todosObject[0]?.todos.length || 0} />
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.todos.error,
    loading: state.todos.loading,
    allTodos: state.todos.todos,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (user, date, fulltodolist, todovalue) =>
      dispatch(todosActions.DELETE_TODO(user, date, fulltodolist, todovalue)),
    updateTodo: (user, date, fulltodolist, todovalue) =>
      dispatch(todosActions.UPDATE_TODO(user, date, fulltodolist, todovalue)),
    addTodo: (user, date, fulltodolist, newtodo) =>
      dispatch(todosActions.ADD_TODO(user, date, fulltodolist, newtodo)),
    fetchTodos: (currentUser, date) =>
      dispatch(todosActions.FETCH_TODOS(currentUser, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
