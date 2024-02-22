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