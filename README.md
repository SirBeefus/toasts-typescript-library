# Generate Toast elements in TypeScript
Thanks to Web Dev Simplified I wrote I small library that generates Toasts. 
The library is written in TypeScript and has a non-class design.

# Basic Usage example

```TypeScript
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
```

# Funtions

| Syntax    | Description   |
| ------    | -----------   |
| show      | show the toast              |
| options   | customize the toast              |

# Options

| Syntax    | Description   |
| ------    | -----------   |
| autoClose| takes milliseconds when to close |
| position| 'top-right', 'top-left', 'top-center', 'bottom-...'|
| text| string |
| onClose| give function when toast closes|
| canClose| boolean if toast should be closed on click |
| type| 'success', 'error' |
