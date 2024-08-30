import React, { useState, useEffect } from 'react';
import apiAxios from '../services/api.js';
import markImage from "../assets/mark.svg";
import editImage from "../assets/editTask.svg";
import deleteImage from "../assets/deleteTask.svg";
import pinImage from "../assets/pin.svg";
import dpinImage from "../assets/dpin.svg";

const InsertForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);



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
    <div className="flex flex-col items-center justify-center ">

      <form onSubmit={editMode ? handleUpdate : handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded ps-2 w-64 h-12  font-quick sm:font-bold sm:text-lg font-medium text-wrap"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border rounded ps-2 w-72 h-24 sm:w-96  sm:h-24  font-quick sm:font-bold sm:text-lg font-medium text-wrap"
          required
        />
        <button type="submit" className="bg-black text-white font-quick rounded px-4 py-2">
          {editMode ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <div className="mt-8   rounded-md  relative flex-col items-center justify-center ">
        {/* <h2 className="text-2xl font-light font-anta text-center text-white  mb-4 p-2  ">Submitted Tasks</h2> */}

        <button onClick={() => setShowCompleted(!showCompleted)} className="bg-black  font-quick font-bold text-white rounded px-2 py-2 mx-4 mb-4">
          {showCompleted ? <span className="flex flex-row"> <img src={dpinImage} alt="" className="w-8 h-6" /> Hide </span> : <span className="flex flex-row"> <img src={pinImage} alt="" className="w-8 h-6" /> View </span>}
        </button>

        <ul className=" rounded w-80 sm:w-[40rem] space-y-2">
          {tasks.map(task => (
            (!task.completed || showCompleted) && (

              <li key={task._id} className=" font-quick  rounded-md px-4 py-2 bg-stone-800">

                <h3 className=" text-md text-white font-quick text-xl py-2"> <span className='font-bold'> Task : </span> {task.title}</h3>

                <p className=" font-quick text-white text-lg "> <span className='font-bold'> Description : </span>{task.description}</p>

                <div className="flex flex-row ">

                {!task.completed && (
                  <button onClick={() => handleMarkCompleted(task._id)} className="bg-blue-500 font-quick text-white font-bold rounded px-2 py-2 mt-2">
                     <img src={markImage} alt="" className="w-8 h-6" />
                  </button>
                )}

                <button onClick={() => handleEdit(task._id)} className="bg-green-500 font-quick text-white font-bold rounded px-2 py-2 mt-2 ml-2">
                <img src={editImage} alt="" className="w-8 h-6" />
                </button>

                <button onClick={() => handleDelete(task._id)} className="bg-red-500 font-quick text-white  font-bold rounded px-2 py-2 mt-2 ml-2">
                <img src={deleteImage} alt="" className="w-8 h-6" />
                </button>

                </div>

              </li>
            )
          ))}
        </ul>

      </div>

    </div>
  );
};

export default InsertForm;
