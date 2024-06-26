//!---------------------------------------------------------------------------------------------------------------!//

/*this is used to load the accounts before anything else so that it is ready to 
be viewed first*/
document.addEventListener('DOMContentLoaded', function ()
{
    loadAccounts();
});

//!---------------------------------------------------------------------------------------------------------------!//

function saveAccount()
{
    /*The const variables will get the id of the label inputs i created
    and use them to push them to the local storage */
    const website = document.getElementById('website').value
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (website && username && password)
    {
        const passwordStrengthResult = checkPasswordStrength(password);

        if(passwordStrengthResult == 'Password is strong')
        {
            const accounts = getAccounts();

            accounts.push({website, username, password});
            localStorage.setItem('accounts', JSON.stringify(accounts));

            alert('The data being collected will not be shared with anyone, it is private to yourself and can be deleted at the click of a button.');
            clearForm();
            loadAccounts();
        } 
        else
        {
            alert(passwordStrengthResult);
        }
    }  
    else
    {
        alert('Please enter website, username, and password');
    }
}

function getAccounts()
{
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

//!---------------------------------------------------------------------------------------------------------------!//

/*Creating a function that will take the inputs when Save Account, and display
them in the Saved Accounts container*/
function loadAccounts()
{
    const accounts__list = document.getElementById('accounts__list');
    const accounts__content = getAccounts();
    
    accounts__list.innerHTML = '';

    accounts__content.forEach((account, index) => 
    {
        //creating a list item so that the input is outputted as a list
        const websiteInput = document.createElement('li');
        websiteInput.textContent = `Website: ${account.website}`;
        //appending website to the list
        accounts__list.appendChild(websiteInput);

        //creating a list item so that the input is outputted as a list
        const usernameInput = document.createElement('ul');
        usernameInput.textContent = `Username: ${account.username}`;
        //appending username to the list
        accounts__list.appendChild(usernameInput);

        //creating a list item so that the input is outputted as a list
        const passwordInput = document.createElement('ul');
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
        
        //when an account is created, so is a new delete button to be assigned to that account
        deleteButton.classList.add('delete-button');
        usernameInput.appendChild(deleteButton)
    });
}

//!---------------------------------------------------------------------------------------------------------------!//

/*creating function to allow the delete button to delete an account once it has been pressed.
When the button is clicked, the account will be checked and filtered and removed from the 
local storage.*/ 
function deleteAccount(index)
{
    //asking user for confirmation before deleting account to avoid accidental deletion
    if(confirm('Are you sure you want to delete this account?'))
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
}

//!---------------------------------------------------------------------------------------------------------------!//

/*creating a function to clear the username and password input box after an account
has been saved for quality of life and to allow a new input after*/ 
function clearForm()
{
    document.getElementById('website').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

//!---------------------------------------------------------------------------------------------------------------!//

/*creating a function to check the strength of implemented password following
the criteria set using regex below. If it doesn't meet the requirements, it will
notify the user and will keep doing so until all tests have been passed, once
the account is saved, it will send out an alert telling the user that they should
change their password on the website to match it in the password manager*/

function checkPasswordStrength(password)
{
    //checking the password for a minimum length:
    if (password.length < 12)
    {
        //if the length is less than 12, alert an error
        return 'Error: Password should be at least 12 characters long';
    }

    //checking for at least 1 number:
    if (!/\d/.test(password))
    {
        //if there is no number in the password, alert an error
        return 'Error: Password should include at least one number';
    }

    //checking for at least 1 special character:
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password))
    {
        //if there is no special character, alert an error
        return 'Error: Password should include at least one special character';
    }

    //checking for at least one capitalized letter:
    if (!/[A-Z]/.test(password))
    {
        //if there is no capitalized letter, alert an error
        return 'Error: Password should include at least one capitalized letter';
    }

    /*notifying the user that the password has passed all strength checks, alongside
    suggesting to change password on actual website*/
    return 'Password is strong';
}



//!---------------------------------------------------------------------------------------------------------------!//
/*Creating the color theme toggle
first going to find the system setting for the user to have a default theme (dark/light) and if button is clicked
switch to the opposite theme and revert if clicked again*/
//!---------------------------------------------------------------------------------------------------------------!//

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

//!---------------------------------------------------------------------------------------------------------------!//

/*creating function to update the buttons text when clicked so that it matches with what it should be.
e.g. when dark is on, button should say 'switch to light' and vice versa with light, it should be
'switch to dark*/ 

function updateButtonText({buttonEl, isDark})
{
    const changeSetting = isDark ? "Change to light theme" : "Change to dark theme"
    buttonEl.setAttribute("aria-label", changeSetting);
    buttonEl.innerText = changeSetting;
}

//!---------------------------------------------------------------------------------------------------------------!//

/* Creating function to update the html tag i set earlier after the lang=en tag.*/

function updateHtmlTag({theme})
{
    document.querySelector("html").setAttribute("data-theme", theme);
}

//!---------------------------------------------------------------------------------------------------------------!//

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

//!---------------------------------------------------------------------------------------------------------------!//

//creating function to export the accounts data to a flat file (will be called accounts.json)
function ExportProfile()
{
    //calling getAccounts function
    const accounts = getAccounts();

    //converting the accounts data to a JavaScript string to allow for it to be sent 
    const data = JSON.stringify(accounts);


    //Encrypting the JSON user data before exporting it
    const encryptedData = CryptoJS.AES.encrypt(data, 'secret_key').toString();

    //creating blob storage to allow exporting the JSON
    const blob = new Blob([encryptedData], {type: 'application/json'});

    //creating string containing the URL of the given parameter, in this case, blob
    const url = URL.createObjectURL(blob);

    
    //creating a temporary anchor element so that it can download a json file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accounts.json';

    //appending data specified to the file
    document.body.appendChild(a);
    //a.click means that the above happens when 'export' is clicked
    a.click();
    document.body.removeChild(a);

    //using revoke to clear up resources and preventing memory leaks
    URL.revokeObjectURL(url);

    //clearing saved accounts section when data is exported
    localStorage.removeItem('accounts');
    alert("DATA HAS BEEN ENCRYPTED");
    loadAccounts();
}

//creating function to import the account data to the accounts section
function ImportProfile()
{
    const input = document.createElement('input');
    //setting the type for importP to file to allow for the file selection
    input.type = 'file';
    //making iy only accept json files
    input.accept = '.json';

    //creating event handler for when the file is selected using the importP element
    input.onchange = function(event)
    {
        //getting the data from the event object
        const file = event.target.files[0];

        //creating a FileReader object so that the contents can be read
        const reader = new FileReader();

        //event handler for FileReader when it has loaded the contents of the selected file
        reader.onload = function(e)
        {

            const encryptedContents = e.target.result;

            //Decrypt the data when reading the JSON file
            const bytes = CryptoJS.AES.decrypt(encryptedContents, 'secret_key');
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            const importedAccounts = JSON.parse(decryptedData);

            //merging the imported accounts with existing accounts
            //getting the existing accounts from the local storage
            const existingAccounts = getAccounts();

            //merge the imported accounts with the existing accounts and store the merged onces back into local storage
            const mergedAccounts = existingAccounts.concat(importedAccounts);
            localStorage.setItem('accounts', JSON.stringify(mergedAccounts));

            //reloading the accounts list
            loadAccounts();
        }
        //read the contents of the file being imported as text only
        reader.readAsText(file);
    };
    //trigger events above when import has been clicked
    input.click();
}

