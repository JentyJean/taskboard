export default function TaskList({ tasks }){
    return(
        <ul className="space-y-2">
            {tasks.map((task, index) => (
                <li
                    key={index}
                    className="border p-2 rounder"
                >
                    {task}
                </li>
            ))}
        </ul>
    )
}