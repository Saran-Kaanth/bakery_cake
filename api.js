let gUserId = 0;
let updateId=0;

async function fetchUserData(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
        if (response.status != 200) {
            alert("User not found!");
        } else {
            const json = await response.json();
            gUserId = userId;
            loadProfileData(json);
            await fetchUserPosts(userId);
        }
    } catch (error) {
        console.log(error);
    }
}

function loadProfileData(profileData) {
    loadProfileHead(profileData.name, profileData.username, profileData.address);
    loadContactInfo(profileData.phone, profileData.email, profileData.company, profileData.website);
}

function loadProfileHead(name, username, address) {
    const imgTag = document.getElementById("profile-img");
    const head1 = document.getElementById("head-1");
    const head2 = document.getElementById("head-2");
    const head3 = document.getElementById("head-3");

    imgTag.src = (gUserId % 2 == 0) ? "images/man.jfif" : "images/woman.jfif";

    head1.innerHTML = name;
    head2.innerHTML = "@ " + username;
    head3.innerHTML = address.street + "," + address.city;
}

function loadContactInfo(phone, email, company, website) {
    const contact1 = document.getElementById("contact-1");
    const contact2 = document.getElementById("contact-2");
    const contact3 = document.getElementById("contact-3");
    const contact4 = document.getElementById("contact-4");

    contact1.innerHTML = phone;
    contact2.innerHTML = email;
    contact3.innerHTML = company.name;
    contact4.innerHTML = website;
}

async function fetchUserPosts(userId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + "/posts");

        if (response.status != 200) {
            alert("Posts Not Found");
        } else {
            const json = await response.json();
            loadUserPosts(json);
        }
    } catch (error) {
        console.log(error);
        alert("Please try again!");
    }
}

function loadUserPosts(postData) {
    try {
        const postArea = document.getElementById("post-info-grid");

        postArea.innerHTML = "";

        postData.forEach((element, index) => {

            const card = document.createElement("div");
            card.className = "post-card";

            const cardBody = document.createElement("div");
            cardBody.id = "post-body";

            const bodyHead = document.createElement("h5");
            bodyHead.className = "regular-gotham";
            bodyHead.innerHTML = element.title.split(' ').slice(0, 2).join(' ');

            cardBody.appendChild(bodyHead);

            const cardButtons = document.createElement("div");
            cardButtons.id = "post-option-buttons";

            const button1 = document.createElement("button");
            button1.type = "button";

            const editSpan = document.createElement("span");
            editSpan.className = "material-symbols-outlined";
            editSpan.innerHTML = "edit";
            editSpan.addEventListener('click', () => { showEditPostArea(element) });

            button1.appendChild(editSpan)

            const button2 = document.createElement("button");
            button2.type = "button";

            const deleteSpan = document.createElement("span");
            deleteSpan.className = "material-symbols-outlined";
            deleteSpan.innerHTML = "delete";
            deleteSpan.addEventListener('click', () => { deletePost(element.id) });

            button2.appendChild(deleteSpan)

            cardButtons.appendChild(button1);
            cardButtons.appendChild(button2);

            card.appendChild(cardBody);
            card.appendChild(cardButtons);

            postArea.appendChild(card);

        });
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

function showAddPostArea() {
    const postArea = document.getElementById("post-area");
    postArea.style.display = "flex";

    const profileSection = document.querySelector(".register-application");
    profileSection.style.display = "flex";
}

function removeAddPostArea() {
    const postArea = document.getElementById("post-area");
    postArea.style.display = "none"

    const profileSection = document.querySelector(".register-application");
    profileSection.style.display = "none";
}

function showEditPostArea(oldPostData) {
    const postArea = document.getElementById("post-area");
    postArea.style.display = "flex";

    const profileSection = document.querySelector("#update-application");
    profileSection.style.display = "flex";
    document.getElementById("titleInputUpdate").value = oldPostData.title;
    document.getElementById("bodyInputUpdate").value = oldPostData.body;
    updateId=oldPostData.id;
}

function removeEditPostArea() {
    const postArea = document.getElementById("post-area");
    postArea.style.display = "none"

    const profileSection = document.querySelector("#update-application");
    profileSection.style.display = "none";
}

async function addPost() {
    try {
        const newPostData = {
            title: document.querySelector("#titleInputAdd").value,
            body: document.querySelector("#bodyInputAdd").value,
            userId: gUserId,
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPostData),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        },);
        const json = await response.json();
        alert("Post added successfully!");
        document.querySelector("#reg-form").reset();
    } catch (error) {
        alert("Not able to add post");
    }
}

async function updatePost() {
    try {
        const updatedData = {
            id:updateId,
            title: document.querySelector("#titleInputUpdate").value,
            body: document.querySelector("#bodyInputUpdate").value,
            userId: gUserId,
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + updatedData.id, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        },);
        const json = await response.json();
        alert("Post Updated Successfully!");
    } catch (error) {
        console.log(error);
        alert("Not able to update post! Please try again!");
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {
            method: 'DELETE',
        },);
        const json = await response.json();
        alert("Successfully Deleted");
        fetchUserData(gUserId);
    } catch (error) {
        alert("Please try again!");
    }
}

fetchUserData(3);