import { api } from '../utils/api'
import { Todo } from './Todo';
import { useState } from "react";
import EditTodo from './EditTodo';

type TodosProps = {
    setShowComponents: (arg: any) => void;
};

export default function Todos({ setShowComponents }: TodosProps) {
    const { data: todos, isLoading, isError } = api.todo.getAll.useQuery();

    const [showEditPg, setShowEditPg] = useState(false)
    const [todoId, setTodoId] = useState('')

    if (isLoading) return <div>Loading todos 🔄</div>
    if (isError) return <div>Error fetching todos ❌</div>

    return (
        <>
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