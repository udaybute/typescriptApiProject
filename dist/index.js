"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const mainContainer = document.querySelector(".main_container");
//reusable function
async function myCustomFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status: ${response.status} `);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
//display the card UI
const showResultUI = (singleUser) => {
    const { avatar_url, login, url, location, followers } = singleUser;
    mainContainer.insertAdjacentHTML("beforeend", ` 
    <div class="col-md-3 m-2 p-2">
    <div class="card" style="width: 18rem;">
    <img src=${avatar_url} class="card-img-top" alt="...">
    <div class="card-body">
     <a href="${url}" > Github <a>
    </div>
  </div>
    <div/>
    
    `);
};
//default function call
function fetchUserData(url) {
    myCustomFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
fetchUserData("https://api.github.com/users");
//search functionality
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        mainContainer.innerHTML = "";
        if (matchingUsers.length === 0) {
            mainContainer?.insertAdjacentHTML("beforeend", `<p class="empty-msg">No matching users found<p/>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
