import React, { Component } from 'react';

export default class extends Component {
	constructor (props) {
	state = {
			query: this.props.query,
			ticker: this.props.ticker,
			searchRelatedQueries: this.props.searchRelatedQueries
		};

	handleChange=(key)=> (evt) => {
			const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
			this.setState({[key]: value});
		}
	

	handleSubmit=(event) =>{
		event.preventDefault();
		this.props.updateGraph(this.state.query, this.state.ticker, this.state.searchRelatedQueries);
	}

	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group col-md-3'>
						<label className='form-check-label'>Enter Google Search Term</label>
							<input className='form-control' type='text' value={this.state.query} onChange={this.handleChange('query')} />
					</div>
					<br style={{clear:'both'}} />
					<div className='form-group col-md-3'>
						<label className='form-check-label'>Enter Stock Ticker</label>
							<input className='form-control' type='text' value={this.state.ticker} onChange={this.handleChange('ticker')} />
					</div>
					<br style={{clear:'both'}} />
					<div className='form-group col-md-3'>
						<label className='form-check-label'>Apply related queries search</label>
						<input className='checkbox checkbox-primary' type='checkbox' checked={this.state.searchRelatedQueries} onChange={this.handleChange('searchRelatedQueries')} />
					</div>
					<br style={{clear:'both'}} />
					<button className='btn btn-primary' type='submit'>Search</button>
				</form>
			</div>
		)
	}
}