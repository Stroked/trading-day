import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import {constructGraph} from './graph/utils';

export default function Graph ({data, financeData}) {
	const node = ReactFauxDOM.createElement('svg');
	constructGraph(node, data, financeData);
	return node.toReact();
}
