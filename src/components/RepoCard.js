import React, { Component } from 'react';
import Commit from '../container/Commit.js';

class RepoCard extends Component {
	state = {
		commits: [],
		clicked: false,
	};

	getTheCommits(company, name) {
		const url = `https://api.github.com/repos/${company}/${name}/commits`;
		fetch(url)
			.then((resp) => resp.json())
			.then((data) =>
				this.setState({
					commits: data,
					clicked: !this.state.clicked,
				})
			);
	}
	render() {
		return (
			<>
				<div id="repo-card">
					<div id="logo">
						<h2>{this.props.repo.name}</h2>
						<img id="avatar" alt="logo for the company" src={this.props.repo.owner.avatar_url}></img>
					</div>
					<div id="language">
						<span>○ {this.props.repo.language}</span>
						<span>☆ {this.props.repo.stargazers_count}</span>
					</div>
					<p>Description: {this.props.repo.description}</p>

					<button
						id="repo-button"
						onClick={() => this.getTheCommits(this.props.company, this.props.repo.name)}
					>
						{this.state.clicked === false ? 'See Recent Commits' : 'Close'}
					</button>
					{this.state.clicked === true ? <Commit commits={this.state.commits} /> : null}
				</div>
			</>
		);
	}
}

export default RepoCard;
