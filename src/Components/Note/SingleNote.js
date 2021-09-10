import React from "react";
import {
	IconButton,
	Typography,
	CardHeader,
	Card,
	CardContent,
} from "@material-ui/core";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function SingleNote({ note, setOpenDelete }) {
	return (
		<div>
			<Card elevation={1}>
				<CardHeader
					action={
						<IconButton
							onClick={() => setOpenDelete({ open: true, id: note.noteID })}
						>
							<DeleteForeverIcon />
						</IconButton>
					}
					title={note.title}
					subheader={note.agentName}
				/>
				<CardContent>
					<Typography variant="body2" color="textSecondary">
						{note.text}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}
