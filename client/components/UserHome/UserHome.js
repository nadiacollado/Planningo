import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";
import { format } from "date-fns";
import Weather from "./Weather";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    let latitude;
    let longitude;
  }

  async componentDidMount() {
    await this.props.fetchUserTasks();
    await navigator.geolocation.getCurrentPosition(function (position) {
      this.latitude = position.coords.latitude.toString();
      this.longitude = position.coords.longitude.toString();
      console.log(latitude, longitude, "lat and long string");
    });
  }
  render() {
    const { firstName } = this.props;
    const { tasks } = this.props;
    const month = format(new Date(), "M");
    const date = format(new Date(), "d");
    const year = format(new Date(), "y");
    const today = `${year}-${month}-${date}`;

    return (
      <div className="userhome-wrapper">
        <h3>{`Hello, ${firstName}`}</h3>
        <br></br>
        <Weather latitude={this.latitude} longitude={this.longitude} />
        <p>{`On your dashboard for today...`}</p>
        <br></br>
        <p>{`${today}`}</p>
        {tasks && tasks.length > 0 ? (
          <ul>
            {tasks
              .filter((task) => {
                return task.start === today;
              })
              .filter((task) => {
                return task.isCompleted === false;
              })
              .map((task) => {
                return <li key={task.id}>{task.name}</li>;
              })}
            <Link to="/tasks">Add a new task!</Link>
          </ul>
        ) : (
          <Link to="/tasks">Add a new task!</Link>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    tasks: state.tasks,
  };
};
const mapDispatch = (dispatch) => ({
  fetchUserTasks: () => dispatch(fetchUserTasksThunk()),
});
export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  firstName: PropTypes.string,
};
