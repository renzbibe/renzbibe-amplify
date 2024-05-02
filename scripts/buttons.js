export function tickAnimation(buttonName){
  const buttons = document.querySelectorAll(`.${buttonName}`);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      let container = button.parentElement.parentElement;
      container.classList.add('purchased');

      setTimeout(() => {
        container.classList.remove('purchased');
      }, 1000);
    })
  });
}