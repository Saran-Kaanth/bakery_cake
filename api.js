async function fetchUserData(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
        const json = await response.json();
        if (Object.keys(json).length == 0) {
            console.log("No Data Available");
        } else {
            console.log(json);
            const userPosts = await fetchUserPosts(userId);
            const userTodos = await fetchUserTodos(userId);
            console.log(userPosts);
            console.log(userTodos);
        }
    } catch (error) {
        console.log(error);
    }
}

async function fetchUserPosts(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + "/posts");
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function fetchUserTodos(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + "/todos");
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
}

async function addPost(newPostData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPostData),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        },);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

async function updatePost(updatedData){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+updatedData.id, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        },);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

async function deletePost(postId){
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+postId, {
            method: 'DELETE',
        },);
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error);
    }
}

// fetchUserData(2)
// addPost({ title: "Love", body: "Good", userId: 2 });
deletePost(2);