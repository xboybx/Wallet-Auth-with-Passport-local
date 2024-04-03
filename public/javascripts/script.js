// let loginarea = document.querySelector(".LoginArea");
let deposit = document.querySelector('#deposit');
let withdraw = document.querySelector('#withdraw');
let balance = document.querySelector('#balance');
let depositInput = document.querySelector('#js-depositinput');
let withdrawInput = document.querySelector('#js-withdrawinput');
let depositBtn = document.querySelector('.btn1');
let withdrawBtn = document.querySelector('.btn2');
// let LoginBtn = document.querySelector('.loginbtn');
let Fulldashboard = document.querySelector('.DashboardWrap');


// // Removing the Login page after clicking Submit
// LoginBtn.addEventListener('click', () => {
//     loginarea.style.display = 'none';
//     Fulldashboard.classList.remove("DashboardWrap");
//     console.log("LoggedIn");

// })



depositBtn.addEventListener('click', () => {
    const value = depositInput.value;
    const depositValue = Number(deposit.innerText) + Number(value);
    const balanceValue = Number(balance.innerText) + Number(value);
    deposit.innerText = depositValue;
    balance.innerText = balanceValue;
    depositInput.value = '';
})


withdrawBtn.addEventListener('click', () => {
    const value = withdrawInput.value;
    if (Number(value) === 0) {
        alert("You don't have any balance to withdraw");
    } else if (Number(value) > Number(balance.innerText)) {
        alert("You don't have that much balance to withdraw");
    } else {
        const balanceValue = Number(balance.innerText) - Number(value);
        const withdrawValue = Number(withdraw.innerText) + Number(value);
        withdraw.innerText = withdrawValue;
        balance.innerText = balanceValue;
        withdrawInput.value = '';
    }
})
