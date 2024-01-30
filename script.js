class UserData {
  constructor(newData) {
    Object.assign(this, newData);
  }

  updateNewInfo(updatedData) {
    Object.assign(this, updatedData);
  }

  isValid() {
    if (!this.name || !this.surname || !this.age || !this.phone || !this.email) {
      return false;
    } else {
      return true;
    }
  }
}

let allUsers = [];
let updateIndex = 0;

const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function showReview(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
}

function nextReview() {
  currentIndex = (currentIndex + 1) % 3;
  showReview(currentIndex);
}

function prevReview() {
  currentIndex = (currentIndex - 1 + 3) % 3;
  showReview(currentIndex);
}

nextBtn.addEventListener('click', nextReview);
prevBtn.addEventListener('click', prevReview);

function navigatePage(pageName) {
  window.location.href = pageName;
}

function addUser() {
  let inputElements = document.querySelectorAll("#userInput");
  const userDataMap = new Map();
  inputElements.forEach(function (element) {
    userDataMap.set(element.name, element.value);
  });
  const userData = new UserData(Object.fromEntries(userDataMap));

  if (userData.isValid()) {
    allUsers.push(userData);
    document.querySelector("#reg-form").reset();
    fetchUsers();
  } else {
    alert("Please enter all values");
  }
}

function fetchUsers() {
  console.log(allUsers);
  const doc = document.querySelector(".show-users");
  if (allUsers.length > 0) {
    const noDataElement = document.querySelector("#no-data");
    if (noDataElement) {
      noDataElement.remove();
    }

    const allDataElements = document.querySelectorAll(".user-item");
    if (allDataElements) {
      allDataElements.forEach((element) => element.remove());
    }


    allUsers.forEach((element, index) => {
      const div = document.createElement("div");
      div.className = "user-item";

      const nameHead = document.createElement("h1");
      nameHead.className = "regular-gotham";
      nameHead.id = "sub-heading";
      nameHead.innerHTML = element.name;

      const emailAddr = document.createElement("h5");
      emailAddr.className = "regular-gotham";
      emailAddr.innerHTML = element.email;

      const editButton = document.createElement("span");
      editButton.className = "material-symbols-outlined";
      editButton.innerHTML = "edit";
      editButton.addEventListener('click', () => { 
        loadUpdateScreen(allUsers[index]);
        updateIndex=index;
      });

      const deleteButton = document.createElement("span");
      deleteButton.className = "material-symbols-outlined";
      deleteButton.innerHTML = "delete";
      deleteButton.addEventListener('click', () => deleteUser(index));

      div.appendChild(nameHead);
      div.appendChild(emailAddr)
      div.appendChild(editButton);
      div.appendChild(deleteButton);

      doc.appendChild(div);
    })

  } else {
    const allDataElements = document.querySelectorAll(".user-item");
    if (allDataElements) {
      allDataElements.forEach((element) => element.remove());
    }
    const noData = document.createElement("h2");
    noData.className = "regular-gotham";
    noData.id = "no-data";
    noData.innerHTML = "No Data";
    doc.append(noData);
  }
}

function loadUpdateScreen(oldData){
  document.getElementById("updateName").value=oldData.name;
  document.getElementById("updateSurName").value=oldData.surname;
  document.getElementById("updateAge").value=oldData.age;
  document.getElementById("updatePhone").value=oldData.phone;
  document.getElementById("updateEmail").value=oldData.email;
}

function updateUser() {
  const updatedData = {
    name: document.getElementById("updateName").value,
    surname: document.getElementById("updateSurName").value,
    age: document.getElementById("updateAge").value,
    phone: document.getElementById("updatePhone").value,
    email: document.getElementById("updateEmail").value
};
  allUsers[updateIndex].updateNewInfo(updatedData);

  if(allUsers[updateIndex].isValid()){
    document.querySelector("#update-form").reset();
    fetchUsers();
  }else{
    alert("No empty values allowed");
  }
}

function deleteUser(index) {
  allUsers.splice(index, 1);
  fetchUsers();
}