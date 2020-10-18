import React, { Component } from 'react';
import './App.css';
import Repo from './container/Repo.js';
import { Github } from '@styled-icons/boxicons-logos/Github';
import Fetch from './components/Fetch.js';
import Error from './components/Error.js'

class App extends Component {
	state = {
		company: '',
		companyResp: {},
		repos: [],
		show: false,
	};

	checkForValidCompany = async (event) => {
		event.preventDefault();
		try {
			let resp = await fetch(`https://api.github.com/orgs/${this.state.company}`)
			this.setState({
				companyResp: resp,
			});
			
			if (resp.ok === true) {
				
				this.fetchTheRepos();
				
			} 
			else {
				throw new Error("Not okay response");
				
			}
		} catch (error) {
			console.log(error)
			this.setState({
				show: true
			})
		}
	}

	fetchTheRepos() {
		fetch(`https://api.github.com/orgs/${this.state.company}/repos`)
			.then((resp) => resp.json())
			.then((data) => {
				this.setState({
					repos: data,
				});
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
				<form id="form" onSubmit={(event) => this.checkForValidCompany(event)}>
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
				{this.state.show === true ? <Error company={this.state.company} /> : ""} 
			</div>
		);
	}
}

export default App;

