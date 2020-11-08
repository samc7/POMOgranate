var isWorkC = false;
var isBreakC = false;

isWorkC = localStorage.getItem("isOn");

console.log(isWorkC);

if (isWorkC == "true") {
    document.documentElement.innerHTML = '';
    document.documentElement.innerHTML = 'This site is blocked';
    document.documentElement.scrollTop = 0;
}