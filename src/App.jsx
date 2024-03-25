import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Autocomplete,
  TextField,
  Button,
  Dialog,
  Menu,
  MenuItem,
} from "@mui/material";
import { IoCloseCircle, IoPerson } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    assignee: "King Pin",
    status: "Assign",
    description: "This is a test description for text purpose to see in a page",
    priority: "P0",
    date: "10/10/2021",
  },
  {
    id: 2,
    title: "Task 2",
    assignee: "Alan Walker",
    status: "In Progress",
    description: "This is a test description for text purpose to see in a page",
    priority: "P1",
    date: "01/01/2021",
  },
  {
    id: 3,
    title: "Task 3",
    assignee: "Enthony Stark",
    status: "Deferred",
    description: "This is a test description for text purpose to see in a page",
    priority: "P2",
    date: "01/02/2021",
  },
  {
    id: 4,
    title: "Task 4",
    assignee: "Ethan Hunt",
    status: "Deployed",
    description: "This is a test description for text purpose to see in a page",
    priority: "P0",
    date: "20/01/2021",
  },
  {
    id: 5,
    title: "Task 5",
    assignee: "Jarvis",
    status: "Completed",
    description: "This is a test description for text purpose to see in a page",
    priority: "P2",
    date: "01/02/2021 - 20/01/2021",
  },
  {
    id: 6,
    title: "Task 6",
    assignee: "Harry Potter",
    status: "In Progress",
    description: "This is a test description for text purpose to see in a page",
    priority: "P0",
    date: "20/05/2021",
  },
  // More tasks here...
];

const priorityOptions = ["P0", "P1", "P2"];
const taskStatus = [
  "Assign",
  "In Progress",
  "Completed",
  "Deployed",
  "Deferred",
];

export default function App() {
  // States

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [assigneeValue, setAssigneValue] = useState("");
  const [sortingPriority, setSortingPriority] = useState(null);
  const [tasksArray, setTasksArray] = useState(tasks);
  const [taskId, setTaskId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("Assign");
  const [priority, setPriority] = useState(null);

  const filterArray = useMemo(() => {
    if (selectedPriority) {
      return tasksArray.filter((item) => item.priority === selectedPriority);
    } else if (assigneeValue) {
      return tasksArray.filter((item) => item.assignee === assigneeValue);
    } else if (sortingPriority) {
      const sortedArray = tasksArray.slice().sort((a, b) => {
        if (a.priority === sortingPriority) return -1;
        if (b.priority === sortingPriority) return 1;
        return a.priority.localeCompare(b.priority);
      });
      return sortedArray;
    }
    return tasksArray;
  }, [selectedPriority, sortingPriority, assigneeValue, tasksArray]);

  // Handlers

  function handleNewTaskBtn() {
    setIsOpen(true);
  }

  function handleDeleteBtn(data) {
    setIsDeleteOpen(true);
    setTaskId(data.id);
    setIsMenuOpen(false);
  }

  function handleDeleteTask() {
    const newArray = tasksArray.filter((task) => task.id !== taskId);
    setTasksArray(newArray);
    setIsDeleteOpen(false);
  }

  function handleEditBtn(data) {
    setIsEditOpen(true);
    setIsOpen(false);
    setTaskId(data.id);
    setTitle(data.title);
    setDescription(data.description);
    setAssignee(data.assignee);
    setStatus(data.status);
    setPriority(data.priority);
    setIsMenuOpen(false);
  }

  function handleDialogClose() {
    setIsOpen(false);
    setIsEditOpen(false);
  }

  function handleDeleteDialogClose() {
    setIsDeleteOpen(false);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      id: tasksArray.length + 1,
      title: title,
      description: description,
      assignee: assignee,
      team: team,
      priority: priority,
      status: status,
      date: new Date(),
    };
    setTasksArray((prevState) => [...prevState, data]);
    setIsOpen(false);
  }

  function handleUpdateTask() {
    const data = {
      id: taskId,
      title: title,
      description: description,
      team: team,
      assignee: assignee,
      priority: priority,
      status: status,
      date: new Date(),
    };
    const newArray = tasksArray.filter((task) => task.id !== data.id);
    setTasksArray(newArray);
    setTasksArray((prevState) => [...prevState, data]);
    setIsEditOpen(false);
  }

  function handleMenuBtn(event) {
    setIsMenuOpen(event.currentTarget);
  }

  function handleMenuBtnClose() {
    setIsMenuOpen(null);
  }

  function handlePriorityChange(event, newvalue) {
    setSelectedPriority(newvalue);
  }

  function handleSortingPriorityChange(event, newvalue) {
    setSortingPriority(newvalue);
  }

  function handleAssigneValue(event) {
    setAssigneValue(event.target.value);
  }

  return (
    <div>
      <div className="headline">
        <h2>Tasks Board</h2>
        <h3>
          <IoPerson size={24} />
        </h3>
      </div>
      <div className="main">
        <div className="filter-newbutton">
          <div className="filter-div">
            <h3>Filter By:</h3>
            <TextField
              label="Enter Assignee Name"
              value={assigneeValue}
              onChange={handleAssigneValue}
              size="small"
            />
            <Autocomplete
              options={priorityOptions}
              sx={{ width: 150 }}
              size="small"
              value={selectedPriority}
              onChange={handlePriorityChange}
              renderInput={(params) => (
                <TextField {...params} label="Priroty" />
              )}
            />

            {/* This is date Fields */}

            {/* <div className="date-box">
              <TextField size="small" type="date" />
              <span>-</span>
              <TextField size="small" type="date" />
            </div> */}
          </div>
          <div className="task-button">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "150px", height: "40px" }}
              onClick={handleNewTaskBtn}
            >
              Add new Task
            </Button>
          </div>
        </div>
        <div className="sort-div">
          <h3>Sort By:</h3>
          <Autocomplete
            options={priorityOptions}
            value={sortingPriority}
            onChange={handleSortingPriorityChange}
            sx={{ width: 150 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Priroty" />}
          />
        </div>

        <div className="alltask-div">
          {taskStatus.map((element, indx) => (
            <div key={indx} className="task-box">
              {element === "Assign" && (
                <div>
                  <h4 className="bgcolor-p status-headline">Pending</h4>
                  {filterArray.map((t, i) => (
                    <div key={i}>
                      {t.status === "Assign" && (
                        <div className="details-div">
                          <div className="title-prio">
                            <h4>{t.title}</h4>
                            <p className="blue-box-prio">{t.priority}</p>
                          </div>
                          <p>{t.description}</p>
                          <div className="assigne-button">
                            <h5>@{t.assignee}</h5>
                            <button
                              className="blue-btn"
                              onClick={handleMenuBtn}
                            >
                              <HiOutlineDotsVertical />
                            </button>
                            <Menu
                              open={Boolean(isMenuOpen)}
                              onClose={handleMenuBtnClose}
                              anchorEl={isMenuOpen}
                            >
                              <MenuItem onClick={() => handleEditBtn(t)}>
                                Edit
                              </MenuItem>
                              <MenuItem onClick={() => handleDeleteBtn(t)}>
                                Delete
                              </MenuItem>
                            </Menu>
                          </div>
                          <p className="blue-box-status">{t.status}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {element === "In Progress" && (
                <div>
                  <h4 className="bgcolor-ip status-headline">In Progress</h4>
                  {filterArray.map((t, i) => (
                    <div key={i}>
                      {t.status === "In Progress" && (
                        <div className="details-div">
                          <div className="title-prio">
                            <h4>{t.title}</h4>
                            <p className="blue-box-prio">{t.priority}</p>
                          </div>
                          <p>{t.description}</p>
                          <div className="assigne-button">
                            <h5>@{t.assignee}</h5>
                            <button
                              onClick={handleMenuBtn}
                              className="blue-btn"
                            >
                              <HiOutlineDotsVertical />
                            </button>
                          </div>
                          <p className="blue-box-status">{t.status}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {element === "Completed" && (
                <div>
                  <h4 className="bgcolor-c status-headline">Completed</h4>
                  {filterArray.map((t, i) => (
                    <div key={i}>
                      {t.status === "Completed" && (
                        <div className="details-div">
                          <div className="title-prio">
                            <h4>{t.title}</h4>
                            <p className="blue-box-prio">{t.priority}</p>
                          </div>
                          <p>{t.description}</p>
                          <div className="assigne-button">
                            <h5>@{t.assignee}</h5>
                            <button
                              onClick={handleMenuBtn}
                              className="blue-btn"
                            >
                              <HiOutlineDotsVertical />
                            </button>
                          </div>
                          <p className="blue-box-status">{t.status}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {element === "Deployed" && (
                <div>
                  <h4 className="bgcolor-d status-headline">Deployed</h4>
                  {filterArray.map((t, i) => (
                    <div key={i}>
                      {t.status === "Deployed" && (
                        <div className="details-div">
                          <div className="title-prio">
                            <h4>{t.title}</h4>
                            <p className="blue-box-prio">{t.priority}</p>
                          </div>
                          <p>{t.description}</p>
                          <div className="assigne-button">
                            <h5>@{t.assignee}</h5>
                            <button
                              onClick={handleMenuBtn}
                              className="blue-btn"
                            >
                              <HiOutlineDotsVertical />
                            </button>
                          </div>
                          <p className="blue-box-status">{t.status}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {element === "Deferred" && (
                <div>
                  <h4 className="bgcolor-df status-headline">Deferred</h4>
                  {filterArray.map((t, i) => (
                    <div key={i}>
                      {t.status === "Deferred" && (
                        <div className="details-div">
                          <div className="title-prio">
                            <h4>{t.title}</h4>
                            <p className="blue-box-prio">{t.priority}</p>
                          </div>
                          <p>{t.description}</p>
                          <div className="assigne-button">
                            <h5>@{t.assignee}</h5>
                            <button
                              onClick={handleMenuBtn}
                              className="blue-btn"
                            >
                              <HiOutlineDotsVertical />
                            </button>
                          </div>
                          <p className="blue-box-status">{t.status}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="task-button2">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "40px", marginBottom: "10px", marginTop: "35px" }}
            onClick={handleNewTaskBtn}
          >
            Add new Task
          </Button>
        </div>
      </div>
      <Dialog open={isOpen || isEditOpen} fullWidth>
        <div>
          <div className="popup-header">
            {isOpen && isEditOpen === false ? (
              <h4>Create A New Task</h4>
            ) : (
              <h4>Edit Task</h4>
            )}
            <IoCloseCircle
              onClick={handleDialogClose}
              size={24}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <div className="input-fields">
                <TextField
                  label="Title"
                  placeholder="Enter Title"
                  size="small"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  margin="normal"
                  required
                  disabled={isEditOpen}
                />
                <TextField
                  margin="normal"
                  label="Description"
                  placeholder="Enter Text Here"
                  onChange={(event) => setDescription(event.target.value)}
                  value={description}
                  minRows={3}
                  required
                  multiline
                  disabled={isEditOpen}
                  size="small"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    margin="normal"
                    label="Team"
                    placeholder="Enter Team Name"
                    value={team}
                    onChange={(event) => setTeam(event.target.value)}
                    sx={{ width: "47%" }}
                    disabled={isEditOpen}
                    size="small"
                  />
                  <TextField
                    sx={{ width: "47%" }}
                    margin="normal"
                    value={assignee}
                    onChange={(event) => setAssignee(event.target.value)}
                    label="Assignee"
                    placeholder="Enter Your Name "
                    required
                    disabled={isEditOpen}
                    size="small"
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Autocomplete
                    options={priorityOptions}
                    sx={{ width: "47%" }}
                    value={priority}
                    onChange={(event, newValue) => setPriority(newValue)}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        required
                        label="Priroty"
                      />
                    )}
                  />
                  {!isOpen && (
                    <Autocomplete
                      options={taskStatus}
                      value={status}
                      defaultValue={"Pending"}
                      onChange={(event, newValue) => setStatus(newValue)}
                      sx={{ width: "47%" }}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} margin="normal" label="Status" />
                      )}
                    />
                  )}
                </div>
                <div>
                  {isOpen ? (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "160px",
                        marginTop: "15px",
                      }}
                    >
                      Sumbit
                    </Button>
                  ) : (
                    <Button
                      onClick={handleUpdateTask}
                      variant="contained"
                      sx={{
                        width: "160px",
                        marginTop: "15px",
                      }}
                    >
                      Update
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      <Dialog open={isDeleteOpen}>
        <div className="popup-header">
          <h4>Delete Task</h4>
          <IoCloseCircle
            onClick={handleDeleteDialogClose}
            size={24}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div style={{ padding: "15px" }}>
          <h4>Do You Wish to Delete Task ?</h4>
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={handleDeleteTask}
            fullWidth
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
