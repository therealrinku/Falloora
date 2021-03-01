import { useState } from "react";
import { connect } from "react-redux";
import Arrows from "../components/Arrows";
import Footer from "../components/Footer";
import Nav2 from "../components/Nav2";
import TodoPage from "../components/TodoPage";
import * as userActions from "../redux/user/userActions";
import moment from "moment";
import { Redirect } from "react-router-dom";

const Homepage = ({ signOut, currentUser }) => {
  const [datePlus, setDatePlus] = useState(0);

  const createDate = (addNum) => {
    return moment(moment(new Date()).add({ days: addNum })).format(
      "ddd MMM Do YYYY"
    );
  };

  const dateArrays = [
    datePlus - 1,
    datePlus,
    datePlus + 1,
    datePlus + 2,
    datePlus + 3,
  ].map((e) => createDate(e));

  return (
    <div className="homepage">
      <Nav2 currentUser={currentUser} SIGNOUT={signOut} />

      <div className="daily--todo-list">
        {dateArrays.map((e) => {
          return (
            <TodoPage
              key={new Date() * Math.random()}
              formatedDate={e}
              datePlus={datePlus}
            />
          );
        })}
      </div>

      <Arrows setDatePlus={setDatePlus} />
      {!currentUser ? <Redirect to="/" /> : null}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(userActions.SIGNOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
