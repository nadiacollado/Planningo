import React, {Component} from "react";
import { connect } from "react-redux";

import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskModal from "./UpdateTaskModal";

import { updateTaskCompletion } from "../../store/singletask";
import {
  postCompletedPointsThunk,
  removeCompletedPointsThunk,
} from "../../store/point";

import "./Tasks.css";
import { fetchGroupsThunk } from "../../store/allGroups";
import { fetchTasksThunk, removeTaskThunk } from "../../store/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

class TaskList extends React {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showTask: false,
    };
    this.showModal = this.showModal.bind(this);
    this.showTaskModal = this.showTaskModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchTasks();
    this.props.fetchGroups();
  }

  async handleDelete(id) {
    try {
      await this.props.deleteTask(id);
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  async toggleCompleted(taskId, isCompleted) {
    try {
      if (isCompleted === false) {
        await this.props.updateTaskCompletion(taskId, !isCompleted);
        await this.props.postAwardedPoints(taskId);
      } else {
        await this.props.updateTaskCompletion(taskId, !isCompleted);
        await this.props.removePoints(taskId);
      }
      this.props.fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  showModal(e) {
    this.setState({ show: !this.state.show });
  }

  showTaskModal(e, taskId) {
    this.setState({ taskId, showTask: !this.state.showTask });
  }

  render() {
    let { tasks } = this.props.userTasks;

    return (
      <div className="task-wrapper">
        <div id="task-box">
          <div className="task-box-header">My Tasks</div>
          <div className="task-box-body">
            <div id="task-box-categories">div</div>

            {/* LIST OF TASKS */}
            <div id="task-box-list">
              {tasks && tasks.length
                ? tasks.map((task) => (
                    <div key={task.id} className="singletask">


                      <button
                        onClick={() =>
                          this.toggleCompleted(task.id, task.isCompleted)
                        }
                        className="group-completeTask"
                      >
                        <div
                          className={
                            task.isCompleted
                              ? "check-circle complete"
                              : "check-circle incomplete"
                          }
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      </button>

                      <a onClick={(e) => this.showTaskModal(e, task.id)}>
                        {task.name}
                      </a>

                      <UpdateTaskModal
                        selectedTask={task.id === this.state.taskId}
                        task={task}
                        onClose={(e) => this.showTaskModal(e)}
                        showTask={this.state.showTask}
                      />
                      <button
                        onClick={() => this.handleDelete(task.id)}
                        className="deleteTask"
                      >
                        X
                      </button>
                    </div>
                  ))
                : "You have no tasks"}
            </div>
            <div id="just-another-layout-div"></div>
          </div>
          <div id="add-button-div">
            <button
              onClick={(e) => {
                this.showModal(e);
              }}
              className="add-task-button"
            >
              <div id="ahhh">
                <FontAwesomeIcon icon={faPlusSquare} />
              </div>
              Add New Task
            </button>
            <CreateTaskModal
              onClose={(e) => this.showModal(e)}
              show={this.state.show}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  userTasks: state.tasks,
  userId: state.user.id,
  groups: state.groups,
});

const mapDispatch = (dispatch) => ({
  fetchTasks: () => dispatch(fetchTasksThunk()),
  deleteTask: (taskId) => dispatch(removeTaskThunk(taskId)),
  updateTaskCompletion: (taskId, isCompleted) =>
    dispatch(updateTaskCompletion(taskId, isCompleted)),
  postAwardedPoints: (taskId) => dispatch(postCompletedPointsThunk(taskId)),
  removePoints: (taskId) => dispatch(removeCompletedPointsThunk(taskId)),
  fetchGroups: () => dispatch(fetchGroupsThunk()),
});

export default connect(mapState, mapDispatch)(TaskList);
