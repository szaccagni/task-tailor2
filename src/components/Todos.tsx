import { api } from '../utils/api'
import { Todo } from './Todo';

type CreateTodoProps = {
    setShowComponents: Function;
};

export default function Todos({ setShowComponents }: CreateTodoProps) {
    const { data: todos, isLoading, isError } = api.todo.getAll.useQuery();

    if (isLoading) return <div>Loading todos 🔄</div>
    if (isError) return <div>Error fetching todos ❌</div>

    return (
        <>
            {todos.length ?
                todos.map((todo) => {
                    return <Todo key={todo.id} todo={todo} />
                })
                : <div className='mb-6'>Create your first todo..</div>}
            <button
                onClick={() => setShowComponents('create')}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >add a task</button>
        </>
    )
}