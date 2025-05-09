'use client';

import Link from 'next/link';

export default function TaskList({ tasks ,onDelete}) {
    return(
        <ul className="space-y-2">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="border p-2 rounded flex justify-between items-center"
                >
                    <Link 
                        href={`/task/${task.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {task.title}
                    </Link>
                    
                    <button
                        className="text-red-500"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}

//在父元件寫功能邏輯，子元件只負責渲染
//子元件需要的功能，用Function的方式寫在父元件裡面，傳過來給子元件用