export const alertMessage = (message, display, color) => {
  const msg = document.getElementById('err-msg');
  msg.innerHTML = message;
  msg.style.display = display;
  msg.style.color = color;
}
