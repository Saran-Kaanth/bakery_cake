// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// fetch('https://jsonplaceholder.typicode.com/users/10')
// .then(response => response.json())
// .then(json => console.log(json))
//   .catch((error)=>console.log(error))

// fetch('https://jsonplaceholder.typicode.com/posts/1', {
//   method: 'DELETE',
// });

// fetch('https://jsonplaceholder.typicode.com/posts/1')
//       .then((response)=>{
//             response.json()
//       })
//       .then((json)=>console.log(json));

async function fetchData() {
      try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1/posts/');
            const json = await response.json();
            console.log(Object.keys(json))
            if(json){
                  console.log(json);
                  // console.log("Empty data");
            }else{
                  console.log("no")
            }
            
      } catch (error) {
            console.error('Error:', error);
      }
      }
        
fetchData();



//   fetch('https://jsonplaceholder.typicode.com/posts/1', {
//       method: 'PUT',
//       body: JSON.stringify({
//         id: 1,
//         title: 'saran',
//         body: 'jack',
//         userId: 1,
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//       .then((response) => response.json())
//       .then((json) => console.log(json));
    