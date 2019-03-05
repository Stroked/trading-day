import React from 'react';

export default function ({relatedQueries}) {
	if (relatedQueries.length === 0) return null;
	return (
		<div className='well col-md-6'>
			<h5>Related Search Queries</h5>
			<ul>
			{ relatedQueries.map(query => {
				return <li key={query}>{query}</li>
			})}
			</ul>
		</div>
	)
}