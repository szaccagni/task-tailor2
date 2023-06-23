import { useState, ChangeEvent } from 'react'
import { useUser } from '@clerk/nextjs'
import { api } from '../utils/api'

type CreateTodoProps = {
    setShowComponents: (arg: any) => void;
};

export default function CreateTodo({ setShowComponents }: CreateTodoProps) {
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        dueDate: ''
    })

    const { mutate, isLoading } = api.todo.create.useMutation({
        onSuccess: () => {
            setNewTodo({
                title: '',
                description: '',
                dueDate: ''
            })
            setShowComponents('todos')
        }
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }));
    };

    return (
        <div className='w-2/5'>
            <button
            onClick={() => setShowComponents('todos')}
                className="inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 mb-10"
            >  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
                Back to Tasks</button>
            <form onSubmit={(e) => {
                e.preventDefault()
                mutate(newTodo)
            }} className="flex flex-col gap-3">
                <div className="grid gap-2 items-center" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)' }}>
                    <label htmlFor="title" className="text-gray-900 text-sm">Title</label>
                    <input
                        id="title"
                        name="title"
                        type='text'
                        value={newTodo.title}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled={isLoading}
                    ></input>
                </div>
                <div className="grid gap-2 items-center" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)' }}>
                    <label htmlFor="description" className="text-gray-900 text-sm">Description</label>
                    <input
                        id='description'
                        name="description"
                        type='text'
                        value={newTodo.description}
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
                        value={newTodo.dueDate}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        disabled={isLoading}
                    ></input>
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >Log Task</button>
            </form>
        </div>
    )
}