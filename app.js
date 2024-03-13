//const { get } = require("jquery");

function MaskPassword(pass)
{
    let str = ""
    for (let index = 0; index < pass.length; index++)
    {
        str = "*"
    }
    return str
}


function saveAccount()
{
    //getting the inputs from the text boxes
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    //checking that the fields arent empty
    if (username !== '' && password !== '')
    {
        const savedAccountContainer = document.createElement('div');
        savedAccountContainer.classList.add('saved-account');

        //create elements to display the username and password
        const usernameOutput = document.createElement('p');
        usernameOutput.textContent = `Username: ${username}`;
        const passwordOutput = document.createElement('p');
        passwordOutput.textContent = `Password: ${MaskPassword(password)}`;

        //appending the details to saved accounts section

        savedAccountContainer.appendChild(usernameOutput);
        savedAccountContainer.appendChild(passwordOutput);

        const savedAccountsSection = document.querySelector('.accounts__content');
        savedAccountsSection.appendChild(savedAccountContainer);

        //empty the input fields after and account has been saved
        usernameInput.value = '';
        passwordInput.value = '';

        //notifying user that the account has been saved
        alert('Account has been saved');
    }
    else
    {
        alert('Please enter username and password');
    }
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
