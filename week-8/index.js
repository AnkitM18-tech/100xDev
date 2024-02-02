// fetch vs axios => fetch is native , axios external library
/* 
function main() {
  fetch("https://sum-server.100xdevs.com/todos").then(async (response) => {
    const json = await response.json(); // maintainers have written it in such a way that to retrieve the json or other types of data, we need async and await. If we don't await on the response then it would return a Promise. => if the data returned is of type text => await response.text()
    console.log(json.todos.length);
  });
}


// Both do the same thing => much cleaner way than previous
async function main() {
  const response = await fetch("https://sum-server.100xdevs.com/todos");
  const json = await response.json();
  console.log(json.todos.length);
}
 */

const axios = require("axios");
// get => axios.get ====> post => axios.post
async function main() {
  const response = await axios.get("https://sum-server.100xdevs.com/todos");
  console.log(response.data.todos.length);
}

// while using axios we will get the final thing in => response.data => it is smart to understand what type of data is being fetched and parse it accordingly saving us one await, so we don't have to do the await response.json() thing here.

main();

/* 

POST/PUT/DELETE in fetch vs axios

async function main() {
    const response = await fetch("https://sum-server.100xdevs.com/todos", {
        method: "POST", // => "DELETE" ,"PUT", "GET" -> by default
        body: {
            username: "Ankit",
            password: "loveday",
        },
        headers: {
            Authorization: "Bearer 123"
        },
    });
}

// post, put, delete => body can be second argument, third argument is headers and others can be sent as well.
// get => second argument is headers key and object. can not send body in get request, but query parameters can be sent. only can be sent in POST request
async function main() {
  const response = await axios.post("https://sum-server.100xdevs.com/todos",{
    username: "Ankit",
    password: "loveday",
  },{
    headers: {
    Authorization: "Bearer 123"
    }
  }); // axios.post , axios.put, axios.delete
  console.log(response.data.todos.length);
}

we can also do => await axios({
    url: ".....",
    method: "POST",
    headers: {
        Authorization: "Bearer 123",
    },
    data: {
        username: "Ankit",
        password: "loveday",
    }
})

// http dump is where we can test these.

*/
