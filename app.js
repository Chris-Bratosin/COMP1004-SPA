function MaskPassword(pass)
{
    let str = ""
    for (let index = 0; index < pass.length; index++)
    {
        str = "*"
    }
    return str
}


// ! THIS NEEDS TO BE FINISHED AND WORKINGS BY 28TH FEBRUARY

function saveAccount()
{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const accounts = saveAccount();
    if (username && password)
    {
            

        accounts.push({username, password});
        localStorage.setItem('accounts', JSON.stringify(accounts));

        alert('Account saved successfully!');
        clearForm();
    }
}



// TODO: PASSWORD STRENGTH CHECKING
// TODO: ACCOUNT DELETION BUTTON
// TODO: FILE SAVING AND FILE OPENING USING JSON 
// TODO: LIGHT AND DARK THEME TOGGLE
// TODO: ZOOM TOGGLE
