import React from 'react';
import CommitCard from '../components/CommitCard.js';

const Commit = (props) => {
	const mapOverCommits = (props) => props.commits.map((commit) => <CommitCard commit={commit} />);

	return <>{mapOverCommits(props)}</>;
};

export default Commit;