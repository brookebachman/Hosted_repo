import React, { Component } from 'react';
import RepoCard from '../components/RepoCard.js';

class Repo extends Component {
	render() {
		const reposSort = () =>
			this.props.repos.sort(function (a, b) {
				return b.stargazers_count - a.stargazers_count;
			});

		const mapOverRepos = () => reposSort().map((repo) => <RepoCard repo={repo} company={this.props.company} />);

		return (
			<div>
				<>{mapOverRepos()}</>
			</div>
		);
	}
}

export default Repo;