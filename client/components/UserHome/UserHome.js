import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./UserHome.css";
import { fetchUserTasksThunk } from "../../store/tasks";
import { format } from "date-fns";
import '@pwabuilder/pwainstall'

import Weather from "./Weather";

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: "",
      latitude: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchUserTasks();
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
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
                <pwa-install></pwa-install>

        <h3>{`Hello, ${firstName}`}</h3>

        <p>{`On your dashboard for today...`}</p>
        <br></br>
        <div className="search-container">
          <form id="search-exapnd">
            <input type="search"></input>
          </form>
        </div>

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
        {this.state.latitude && this.state.longitude ? (
          <Weather
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />
        ) : (
          <p>Fetching Weather Info...</p>
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
