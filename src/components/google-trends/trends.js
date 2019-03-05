import googleTrends from "google-trends-api";
import { startDate, endDate } from "../graph/constants";
export function executeQuery(keyword,searchRelatedQueries) {
  const queryArr=[keyword]
         if (searchRelatedQueries === "true") {
          getRelatedQueries(keyword)
             .then(queries => {
               queries.default.rankedList[0].rankedKeyword.forEach(
                 query => {
                   if (query.value > 50 && queryArr.length < 5) {
                     queryArr.push(query.query);
                   }
                 }
               );
               return queryArr;
             })
             .then(queries => {
              getInterestOverTime(queryArr)
		.then(data => {
			data.queries = queryArr.slice(1, queryArr.length);
			res.json(data);
		})
		.catch((err) => {
			res.status(500).send(err.message);
		});
             })
             .catch(next);
         } else {
           getInterestOverTime(queryArr, res);
         }
       }
export function getInterestOverTime(keyword) {
  return googleTrends
    .interestOverTime({
      keyword: keyword,
      startTime: startDate,
      endTime: endDate
    })
    .then(res => {
      return JSON.parse(res);
    })
    .catch(err => {
      throw err;
    });
}

export function getRelatedQueries(keyword) {
  return googleTrends
    .relatedQueries({
      keyword: keyword,
      startTime: startDate,
      endTime: endDate
    })
    .then(res => {
      return JSON.parse(res);
    })
    .catch(err => {
      throw err;
    });
}
