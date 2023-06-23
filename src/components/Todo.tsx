import type { Todo } from '../utils/types'
import { useState } from 'react'
import Status from './Status'
import { api } from '~/utils/api'
import Tooltip from '@mui/material/Tooltip';

type TodoProps = {
	todo: Todo,
	setTodoId: (arg: any) => void;
	setShowEditPg: (arg: any) => void;
}

export function Todo({ todo, setTodoId, setShowEditPg }: TodoProps) {
	const { id, title, description, dueDate, status } = todo
	const [showDescription, setShowDescription] = useState(false)

	const ctx = api.useContext()

	const { mutate: deleteMutation } = api.todo.delete.useMutation({
		onSuccess: () => {
			void ctx.todo.getAll.invalidate()
		}
	})

	const handleEditClick = () => {
		setTodoId(id)
		setShowEditPg(true)
	}

	return (
		<div
			className="bg-slate-200	 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mb-3.5 p-4"
		>
			<div className="flex items-center">
				<button
					onClick={() => setShowDescription(!showDescription)}
					className='pr-2 cursor-pointer'
				>
					{!showDescription &&
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>}
					{showDescription &&
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
						</svg>
					}
				</button>
				<div className='flex justify-between w-full items-center'>
					<div>{title}</div>
					<div className='flex items-center'>
						<div className='mr-3'>DUE: &nbsp; 
							{new Date(dueDate).toLocaleDateString("en-US")}{" "}
							{new Date(dueDate).toLocaleTimeString("en-US", {
								// hour12: false,
								hour: "2-digit",
								minute: "2-digit",
							})}
						</div>
						<div>
							<Status status={status} id={id} />
						</div>
					</div>
				</div>
			</div>
			{showDescription &&
				<div className='ml-7'>
					<div className='mt-3'>{description}</div>
					<div className='mt-3 flex justify-center'>
						<Tooltip title="EDIT">
							<button className='mr-3' onClick={handleEditClick}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:text-green-800">
									<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
								</svg>
							</button>
						</Tooltip>

						<Tooltip title="DELETE">
							<button onClick={() => deleteMutation(id)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:text-red-600">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</button>
						</Tooltip>
					</div>
				</div>}
		</div>
	)
}