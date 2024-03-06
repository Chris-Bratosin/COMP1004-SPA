
function MaskPassword(pass)
{
    let str = ""
    for (let index = 0; index < pass.length; index++)
    {
        str = "*"
    }
    return str
}

//document.getElementById("main__button").addEventListener("click", saveAccount)


function saveAccount()
{
    
}


// ! THIS NEEDS TO BE FINISHED AND WORKINGS BY 28TH FEBRUARY
/*
function saveAccount()
{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;npg 
    const accounts = saveAccount();
    if (username && password)
    {
            

        accounts.push({username, password});
        localStorage.setItem('accounts', JSON.stringify(accounts));

        alert('Account saved successfully!');
        clearForm();
    }

    savedAccounts.forEach((accounts, index) => 
    {
        const usernameItem = document.createElement('li');
        usernameItem.textContent = `Username: ${accounts.username}`;
        //appending the username to the list
        accountsList.appendChild(usernameItem);

        const passwordItem = document.createElement('li');
        passwordItem.textContent = `Password: ${accounts.username}`;
        //appending the username to the list
        accountsList.appendChild(passwordItem);
    });
}
*/


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
