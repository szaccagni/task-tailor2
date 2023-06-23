import { useState, ChangeEvent } from 'react'
import { useUser } from '@clerk/nextjs'
import { api } from '../utils/api'

export default function CreateTodo() {
    const { user } = useUser();
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        dueDate: ''
    })

    const ctx = api.useContext()

    const { mutate, isLoading } = api.todo.create.useMutation({
        onSuccess: () => {
            setNewTodo({
                title: '',
                description: '',
                dueDate: ''
            })
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700"
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700"
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