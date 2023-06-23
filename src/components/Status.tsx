import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useState } from "react";
import { api } from '../utils/api'


type InputProps = {
    status: string,
    id: string
};

export default function Status({ status, id }: InputProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
        null
    );

    const possibileStatus = ['NOT STARTED', 'IN PROGRESS', 'COMPLETE'].filter(el => el !== status.toUpperCase())

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popId = open ? "simple-popover" : undefined;

    const ctx = api.useContext()

    const { mutate } = api.todo.updateStatus.useMutation({
        onSuccess: () => {
			void ctx.todo.getAll.invalidate()
		}
    })
    

    return (
        <div>
            <Button aria-describedby={popId} variant="contained" onClick={handleClick}>
                {status}
            </Button>
            <Popover
                id={popId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
            >
                <div>
                    {possibileStatus.map((stati, idx) => {
                        return (
                            <div key={idx}>
                                <Button
                                    onClick={() => {mutate({id: id, status: stati}), handleClose()}}
                                >{stati}</Button>
                            </div>
                        )
                    })}
                </div>
            </Popover>
        </div>
    );
}
