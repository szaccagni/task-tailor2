import { useState, ChangeEvent, useEffect } from 'react';
import { api } from '../utils/api';
import dayjs from 'dayjs';

type EditTodoProps = {
    setShowEditPg: (arg: any) => void;
    todoId: string;
};

export default function EditTodo({ setShowEditPg, todoId }: EditTodoProps) {
    const { data: foundTodo, isLoading } = api.todo.getOneTodo.useQuery(todoId);
    const [updatedTodo, setUpdatedTodo] = useState({
        id: '',
        title: '',
        description: '',
        dueDate: '',
        status: '',
    });

    useEffect(() => {
        if (foundTodo) {
            setUpdatedTodo({
                id: foundTodo.id,
                title: foundTodo.title,
                description: foundTodo.description,
                dueDate: dayjs(foundTodo.dueDate).format('YYYY-MM-DDTHH:mm'),
                status: foundTodo.status,
            });
        }
    }, [foundTodo]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedTodo((prevTodo) => ({
            ...prevTodo,
            [name]: value,
        }));
    };

    const ctx = api.useContext()

    const { mutate } = api.todo.updateTodo.useMutation({
        onSuccess: () => {
			void ctx.todo.getAll.invalidate()
            setShowEditPg(false)
		}
    })

    if (isLoading) {
        return <div>Loading... 🔄</div>;
    }

    return (
        <div>
            {foundTodo ? (
                <div>
                    <button
                        onClick={() => setShowEditPg(false)}
                        className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 mb-10"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Back to Tasks
                    </button>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            mutate(updatedTodo)
                            console.log(updatedTodo);
                        }}
                        className="flex flex-col gap-3"
                    >
                        <div
                            className="grid gap-2 items-center"
                            style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)' }}
                        >
                            <label htmlFor="title" className="text-gray-900 text-sm">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={updatedTodo.title}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            // disabled={isLoading}
                            ></input>
                        </div>
                        <div className="grid gap-2 items-center" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)' }}>
                            <label htmlFor="description" className="text-gray-900 text-sm">Description</label>
                            <input
                                id='description'
                                name="description"
                                type='text'
                                value={updatedTodo.description}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                disabled={isLoading}
                            ></input>
                        </div>
                        <div className="grid gap-2 items-center" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)' }}>
                            <label htmlFor="due" className="text-gray-900 text-sm">Due Date</label>
                            <input
                                id='due'
                                name="dueDate"
                                type='datetime-local'
                                value={updatedTodo?.dueDate ? dayjs(updatedTodo.dueDate).format('YYYY-MM-DDTHH:mm') : ''}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                disabled={isLoading}
                            ></input>
                        </div>
                        <div className="grid gap-2 items-center" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)' }}>
                            <label htmlFor="status" className="text-gray-900 text-sm">Due Date</label>
                            <select
                                id="status"
                                name="status"
                                value={updatedTodo.status}
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                disabled={isLoading}
                            >
                                <option value="NOT STARTED">NOT STARTED</option>
                                <option value="IN PROGRESS">IN PROGRESS</option>
                                <option value="COMPLETE">COMPLETE</option>
                            </select>
                        </div>
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Update Task
                        </button>
                    </form>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
