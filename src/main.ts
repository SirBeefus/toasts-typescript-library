import './style.css'
import useToast from "./Toast"

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<h1>Tests</h1>
`

document.querySelector<HTMLButtonElement>("#toast-button")?.addEventListener("click", () => {
  const { options, show } = useToast(app);
  options.text = 'Hallo';
  options.position = 'top-right';
  options.type = 'error';
  options.onClose = () => console.log('hey');
  show();
})