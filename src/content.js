isOn = localStorage.getItem("isOn");

console.log(isOn);

if (!isWorkC) {
    document.documentElement.innerHTML = '';
    document.documentElement.innerHTML = 'This site is blocked';
    document.documentElement.scrollTop = 0;
}