function fetchData(api, callback, component) {
  //   $.getJSON(api, "", function(data) {
  //       callback.call(component, data);
  //     }
  //   ).fail(function() {
  //     console.log("Data is unavailable.");
  //   });
  // }
  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Work with JSON data here
       console.log(data);
    callback.call(component, data);
    })
    .catch(err => {
      // Do something for an error here
    });
}
export { fetchData };
