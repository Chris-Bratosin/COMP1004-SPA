//const { get } = require("jquery");

function MaskPassword(pass)
{
    let str = ""
    for (let index = 0; index < pass.length; index++)
    {
        str += "*"
    }
    return str
}

document.addEventListener('DOMContentLoaded', function ()
{
    loadAccounts();
});

//function to save the account to the Saved Accounts section
function saveAccount()
{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password)
    {
        const accounts = getAccounts();

        accounts.push({username, password});
        localStorage.setItem('accounts', JSON.stringify(accounts));

        alert('Account has been saved');
        clearForm();
        loadAccounts();
    }
    else
    {
        alert('Please enter username and password');
    }
}

function getAccounts()
{
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

//function to load the account once the save account button has been clicked
function loadAccounts()
{
    const accounts__list = document.getElementById('accounts__list');
   
    const accounts__content = getAccounts();

    accounts__list.innerHTML = '';

    accounts__content.forEach((account, index) => 
    {
        const usernameInput = document.createElement('li');
        usernameInput.textContent = `Username: ${account.username}`;
        //appending username to the list
        accounts__list.appendChild(usernameInput);

        const passwordInput = document.createElement('li');
        passwordInput.textContent = `Password: ${account.password}`;
        //appending password to the list
        accounts__list.appendChild(passwordInput);


        //creating a delete button to delete unwanted accounts 
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function()
        {
            deleteAccount(index);
        });

        deleteButton.classList.add('delete-button');
        usernameInput.appendChild(deleteButton)
    });
}

function deleteAccount(index)
{
    //using let as it will be changing it
    let accounts = getAccounts();

    //Filter out the account i don't want to have in the storage
    accounts = accounts.filter((account, i) => 
    {
        //if this returns true, then it keeps the item, if it returns false, it is deleted from the array
        //to remove the item with index i, return false if i is equal to index
        //otherwise return true
        return i !== index;
    })

    //update the local storage item
    localStorage.setItem("accounts", JSON.stringify(accounts));
    


    //reload the account list
    loadAccounts();
}

function clearForm()
{
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}





/*Creating the color theme toggle
first going to find the system setting for the user to have a default theme (dark/light) and if button is clicked
switch to the opposite theme and revert if clicked again*/

function themeSetting({localStorageTheme, systemSettingsDark})
{
    if (localStorageTheme !== null)
    {
        return localStorageTheme;
    }

    if (systemSettingsDark.matches)
    {
        return "dark";
    }

    return "light";
}

/*creating function to update the buttons text when clicked so that it matches with what it should be.
e.g. when dark is on, button should say 'switch to light' and vice versa with light, it should be
'switch to dark*/ 

function updateButtonText({buttonEl, isDark})
{
    const changeSetting = isDark ? "Change to light theme" : "Change to dark theme"
    buttonEl.setAttribute("aria-label", changeSetting);
    buttonEl.innerText = changeSetting;
}

/* Creating function to update the html tag i set earlier after the lang=en tag.*/

function updateHtmlTag({theme})
{
    document.querySelector("html").setAttribute("data-theme", theme);
}

/*finally, going to get the system settings for when the page loads then figure the current site settings
and update the theme depending on what the users needs are. going to make use of an event listener for when 
the user clicks the button toggle*/

const button = document.querySelector("[data-theme-toggle");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingsDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = themeSetting({localStorageTheme, systemSettingsDark})

updateButtonText({buttonEl : button, isDark: currentThemeSetting === "dark"});
updateHtmlTag({theme : currentThemeSetting});

button.addEventListener("click", (event) => 
{
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

        localStorage.setItem("theme", newTheme);
        updateButtonText({buttonEl: button, isDark: newTheme === "dark"});
        updateHtmlTag({theme: newTheme});

        currentThemeSetting = newTheme;
});



// TODO: PASSWORD STRENGTH CHECKING
// TODO: ACCOUNT DELETION BUTTON
// TODO: FILE SAVING AND FILE OPENING USING JSON 
// TODO: ZOOM TOGGLE 
