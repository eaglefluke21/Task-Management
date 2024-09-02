import React, { useState, useEffect } from 'react';
import apiAxios from '../services/api.js';
import markImage from "../assets/mark.svg";
import editImage from "../assets/editTask.svg";
import deleteImage from "../assets/deleteTask.svg";
import pinImage from "../assets/pin.svg";
import dpinImage from "../assets/dpin.svg";




import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



const InsertForm = () => {

// shadn cn state Managment
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleAction = (action, taskId) => {
    action(taskId); 
    setSelectedTask(null); 
  };




// Manage State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);



  //Fetch Tasks
  const fetchTasks = async () => {
    try {
      
      const response = await apiAxios.get(`/users/getTasks`);

      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);



//Add Tasks
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     

      const data = {
        title,
         description,
      };

      const response = await apiAxios.post(`/users/addTask`,data);

      if (response.status === 201) {
        setTitle('');
        setDescription('');
        fetchTasks();
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data. Please try again.');
    }
  };



//Edit Tasks
  const handleEdit = (taskId) => {
    setEditMode(true);
    const taskToEdit = tasks.find(task => task._id === taskId);
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditTaskId(taskId);
  };




  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
     
      const data = {
        title,
         description,
         showCompleted,
      };

      const response = await apiAxios.put(`/users/updateTask/${editTaskId}`,data);

      if (response.status === 200) {

        setTitle('');
        setDescription('');
        setEditMode(false);
        setEditTaskId(null);
        fetchTasks();
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task. Please try again.');
    }
  };



//Delete Tasks
  const handleDelete = async (taskId) => {
    try {
    

     
      const response = await apiAxios.delete(`/users/deleteTask/${taskId}`);

      if (response.status === 200) {

        fetchTasks();
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task. Please try again.');
    }
  };



  //Mark Task as Completed
  const handleMarkCompleted = async (taskId) => {
    try {
      

      const response = await apiAxios.put(`/users/markCompleted/${taskId}`);

      if (response.status === 200) {

        fetchTasks();
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
      alert('Error marking task as completed. Please try again.');
    }
  };





  return (

<div className="flex flex-col  items-center justify-center ">

{/* Form  */}

      <form onSubmit={editMode ? handleUpdate : handleSubmit} className="flex flex-col items-center justify-center gap-2 ">
        <div className="flex flex-col items-center justify-center  ">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="focus:outline-none  ps-2 w-72 h-10 sm:w-96    font-quick sm:font-semibold sm:text-lg font-sm text-wrap bg-gray-200 text-black placeholder-black rounded-t-md required"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="focus:outline-none ps-2 w-72 h-24 sm:w-96  sm:h-24  font-quick sm:font-semibold sm:text-lg font-sm text-wrap bg-gray-200 text-black placeholder-black rounded-b-md required"
          required
        />
        </div>
        <button type="submit" className="bg-yellow-500 text-black font-quick font-bold text-xs  sm:font-semibold  sm:text-lg rounded px-4 py-2">
          {editMode ? 'Update Task' : 'Add Task'}
        </button>
      </form>





      <div className="mt-8  rounded-md flex flex-col items-center justify-center  ">



      {/* View Button */}
      <div className="self-start w-full">
        <button onClick={() => setShowCompleted(!showCompleted)} className="bg-gray-600  text-white font-quick font-medium text-xs  sm:font-semibold  sm:text-lg rounded px-2 py-2 mx-4 mb-4 ">
          {showCompleted ? <span className="flex flex-row text-white"> <img src={dpinImage} alt="" className="w-6 h-4 sm:w-8 sm:h-6  " /> Hide </span> : <span className="flex flex-row  "> <img src={pinImage} alt="" className="w-6 h-4 sm:w-8 sm:h-6" /> View </span>}
        </button>

        </div>





        {/* Task List */}
        <ul className="rounded w-80 sm:w-[40rem]  grid grid-cols-2 gap-2">
        {tasks.map(task => (
          (!task.completed || showCompleted) && (
            <li key={task._id} className="font-quick rounded-md px-4 py-2 bg-yellow-500">
              <h3 
                className="text-black font-quick font-medium text-xs  sm:font-semibold sm:text-lg py-2 cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                {task.title}
              </h3>
            </li>
          )
        ))}
      </ul>



        {/* Sheet with Selected Task */}

        {selectedTask && (
  <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>

    <SheetContent className="flex flex-col  justify-between">

      <div className="flex flex-col">
        <SheetTitle>Task: {selectedTask.title}</SheetTitle>
        <SheetDescription className="mt-4">
          <div className="font-quick text-black text-lg">
            <span className='font-bold'>Description:</span> {selectedTask.description}
          </div>
        </SheetDescription>
      </div>
      <div className="flex flex-row justify-center mt-4 space-x-2">
        {!selectedTask.completed && (
          <button onClick={() => handleAction(handleMarkCompleted, selectedTask._id)}
            className="bg-blue-500 font-quick text-white font-bold rounded px-2 py-2 flex items-center">
            <img src={markImage} alt="" className="w-8 h-6" /> <span className="hidden sm:inline"> Mark </span>
          </button>
        )}
        <button onClick={() => handleAction(handleEdit, selectedTask._id)}
          className="bg-green-500 font-quick text-white font-bold rounded px-2 py-2 flex items-center">
          <img src={editImage} alt="" className="w-8 h-6" /> <span className="hidden sm:inline"> Edit </span>
        </button>
        <button onClick={() => handleAction(handleDelete, selectedTask._id)}
          className="bg-red-500 font-quick text-white font-bold rounded px-2 py-2 flex items-center">
          <img src={deleteImage} alt="" className="w-8 h-6" /> <span className="hidden sm:inline"> Delete </span>
        </button>
      </div>
    </SheetContent>
  </Sheet>
)}



      </div>

    </div>
  );
};

export default InsertForm;
