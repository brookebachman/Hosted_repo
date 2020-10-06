import React from 'react';
import { Edit } from '@styled-icons/boxicons-solid/Edit';

const CommitCard = (props) => {
	const convertDate = (props) => {
		const year = props.commit.commit.committer.date.slice(0, 4);
		let month = props.commit.commit.committer.date.slice(5, 7);
		const day = props.commit.commit.committer.date.slice(8, 10);
		if (month < 10) {
			month = month = props.commit.commit.committer.date[6];
		}
		return `${month}/${day}/${year}`;
	};

	return (
		<div id="cc">
			<div id="commit-card">
				<p id="commit-user">
					<Edit size="15" /> {props.commit.commit.author.name}
				</p>
				<p id="date"> {convertDate(props)}</p>
			</div>
			<p id="message"> {props.commit.commit.message}</p>
			<p>{props.commit.sha}</p>
		</div>
	);
};

export default CommitCard;
