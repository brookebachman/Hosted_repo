import React, { Component } from 'react';
import './App.css';
import Repo from './container/Repo.js';
import { Github } from '@styled-icons/boxicons-logos/Github';
import Fetch from './components/Fetch.js';

class App extends Component {
	state = {
		company: '',
		companyResp: {},
		repos: [],
		show: false,
	};


	fetchTheRepos(event) {
    event.preventDefault();
		fetch(`https://api.github.com/orgs/${this.state.company}/repos`)
			.then((resp) => resp.json())
			.then((data) => {
				this.setState({
					repos: data,
				});
			});
		this.setState({
			show: true,
		});
	}

	changeCompany = (event) => {
		let value = event.target.value;
		this.setState({
			company: value,
		});
	};

	render() {
		return (
			<div id="main">
				<div id="header">
					<div id="netflix-title">
						{`Github ${this.state.company} Repos`} <Github size="40" />
					</div>
				</div>
				<form id="form" onSubmit={(event) => this.fetchTheRepos(event)}>
					<label for="fname">Enter a Company Name: </label>
					<input onChange={this.changeCompany} value={this.state.company} />
					<button id="search">Search</button>
					<p>Hint: Enter full company name without spaces, ie. "jpmorganchase" </p>
				</form>
				{this.state.repos.length !== 0 ? (
					<Repo company={this.state.company} repos={this.state.repos} />
				) : (
					<Fetch />
				)}
				{/* {this.state.show === true ? <Error company={this.state.company} /> : ""}  */}
			</div>
		);
	}
}

export default App;

