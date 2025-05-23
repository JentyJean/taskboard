// 'use client' 表示這是一個客戶端組件，可以使用瀏覽器的API和React hooks
'use client';

// 引入所需的套件和組件
import Link from "next/link";
import { useState, useEffect } from "react";  // 引入 React 的 useState hook 來管理狀態
import TaskList from "../conponents/TaskList";  // 引入自定義的 TaskList 組件

// 定義主頁面組件
export default function Home() {
  // 使用 useState 來管理任務列表狀態
  // tasks 是一個陣列，用來儲存所有任務
  // setTasks 是更新 tasks 的函數
  const [tasks, setTasks] = useState([]);

  // 使用 useState 來管理新任務的輸入值
  // newTask 是一個字串，用來儲存輸入框的當前值
  // setNewTask 是更新 newTask 的函數
  const [newTask, setNewTask] = useState('');

  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id),0);
    setNextId(maxId + 1);
  },[])

  // 定義添加任務的函數
  const addTask = () => {
    console.log("Before" + tasks);  // 輸出添加前的任務列表
    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: '',
    };
    const updatedTasks = [...tasks, newTaskObj];  // 使用展開運算符創建新的任務陣列
    setTasks(updatedTasks);  // 更新任務列表狀態
    console.log("After" + updatedTasks);  // 輸出添加後的任務列表
    setNewTask('');  // 清空輸入框

    setNextId(nextId + 1);
    localStorage.setItem('task', JSON.stringify(updatedTasks));
  };

  const handleDelete = (deleteId) => {
    const newTasks = tasks.filter((task) => task.id !== deleteId); //index會因為array的增刪而變動，不穩定，改用id
    setTasks(newTasks); //把新的array重新傳入，重新渲染
    localStorage.setItem('task', JSON.stringify(newTasks));
  }

  // 返回要渲染的 JSX
  return (
    // main 容器，使用 Tailwind CSS 設置內邊距
    <main className="p-4 max-w-md mx-auto">
      {/* 標題 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* 輸入區域容器 */}
      <div className="flex gap-2 mb-4">
        {/* 任務輸入框 */}
        <input
          className="border p-2 flex-1"  // 使用 Tailwind CSS 設置樣式
          placeholder="Enter a task"
          value={newTask}  // 將輸入框的值綁定到 newTask 狀態
          onChange={(e) => setNewTask(e.target.value)}  // 當輸入值改變時更新 newTask
        />
        {/* 添加按鈕 */}
        <button
          className="bg-blue-500 text-white px-4"  // 使用 Tailwind CSS 設置按鈕樣式
          onClick={addTask}  // 點擊時執行 addTask 函數
        >
          Add
        </button>
      </div>
      
      {/* 渲染任務列表組件，並傳遞任務數據作為 props */}
      <TaskList tasks={tasks} onDelete={handleDelete}D/>
      

    </main>
  );
}
