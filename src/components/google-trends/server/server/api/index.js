const trends = require('../../../trends');
const router = require('express').Router();

router.get('/fetchData/:keyword', (req, res, next) => {
	const queryArr = [req.params.keyword];
	const searchRelatedQueries = req.query.searchRelatedQueries;
	console.log("RELATED SEARCH QUERY", searchRelatedQueries);
	if (searchRelatedQueries === 'true') {
		trends.getRelatedQueries(req.params.keyword)
			.then(queries => {
				queries.default.rankedList[0].rankedKeyword.forEach(query => {
					if (query.value > 50 && queryArr.length < 5) {
						queryArr.push(query.query);
					}
				})
				return queryArr;
			})
			.then(queries => {
				getInterestOverTime(queries, res)
			})
			.catch(next);
	} else {
		getInterestOverTime(queryArr, res);
	}
});

function getInterestOverTime (queryArr, res) {
	console.log('err: '+queryArr);
	trends.getInterestOverTime(queryArr)
		.then(data => {
			data.queries = queryArr.slice(1, queryArr.length);
			res.json(data);
		})
		.catch((err) => {
			res.status(500).send(err.message);
		});
}

module.exports = router;