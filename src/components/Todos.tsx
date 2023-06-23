import { api } from '../utils/api'
import { Todo } from './Todo';
import { useState } from "react";
import EditTodo from './EditTodo';

type TodosProps = {
    setShowComponents: (arg: any) => void;
};

export default function Todos({ setShowComponents }: TodosProps) {
    const [sortBy, setSortBy] = useState('dueDate')
    const [showEditPg, setShowEditPg] = useState(false)
    const [todoId, setTodoId] = useState('')
    const { data: todos, isLoading, isError } = api.todo.getAll.useQuery(sortBy);

    if (isLoading) return <div>Loading todos 🔄</div>
    if (isError) return <div>Error fetching todos ❌</div>

    return (
        <>
            <div className='flex items-center justify-between'>
                <h3 className="text-xl font-bold mb-4">Tailor Your Tasks</h3>
                <div className='flex items-center mb-4'>
                    <div className='flex items-center'>
                        <div className='mr-3'>
                        sort by
                        </div>
                        <select
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer'
                            id="filter"
                            name="filter"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            {/* <option disabled selected hidden>sort by</option> */}
                            <option selected={sortBy === 'title'} value='title'>title</option>
                            <option selected={sortBy === 'status'} value='status'>status</option>
                            <option selected={sortBy === 'dueDate'} value='dueDate'>due date</option>
                        </select>
                    </div>
                </div>

            </div>
            {todos.length ?
                <>
                    {!showEditPg ?
                        <>
                            {
                                todos.map((todo) => {
                                    return <Todo key={todo.id} todo={todo} setTodoId={setTodoId} setShowEditPg={setShowEditPg} />
                                })
                            }
                        </>
                        :
                        <><EditTodo setShowEditPg={setShowEditPg} todoId={todoId} />
                        </>
                    }
                </>

                : <div className='mb-6'>Create your first todo..</div>}

            {!showEditPg &&
                <button
                    onClick={() => setShowComponents('create')}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >add a task</button>
            }

        </>
    )
}