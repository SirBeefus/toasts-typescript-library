interface IToastComposable {
    options: IOptions
    show: () => void
};

interface IOptions {
    autoClose: number
    position: string,
    text: string,
    onClose: CallableFunction
    canClose: boolean
    type: string
}

const _createDiv = (): HTMLDivElement => {
    return document.createElement('div');
}

const useToast = (app: HTMLElement): IToastComposable => {
    const toastElem = _createDiv();
    toastElem.classList.add('toast');
    requestAnimationFrame(() => {
        toastElem.classList.add('show');
    })
    let isClosed = false;
    const visibleSince: Date = new Date();

    const options: IOptions = {
        autoClose: 5000,
        position: 'top-right',
        text: 'This is a toast',
        onClose: () => {} ,
        canClose: true,
        type: 'success',
    }

    const createContainer = (position: string): HTMLDivElement => {
        const container: HTMLDivElement = _createDiv();
        container.classList.add('toast-container');
        container.dataset.position = position;
        app.appendChild(container);
        return container;
    }

    const position = (value: string): void => {
        const selector = `.toast-container[data-position="${value}"]`;
        const container: HTMLDivElement = document.querySelector(selector) || createContainer(value);
        container.prepend(toastElem);
    }

    const text = (value: string): void => {
        toastElem.textContent = value;
    }

    const remove = (): void => {
        const container: HTMLElement = toastElem.parentElement!;
        toastElem.classList.remove('show');
        toastElem.addEventListener('transitionend', () => {
            toastElem.remove();
        if (container.hasChildNodes()) return;
        container.remove();
        })
    }

    const onClose = (cb: CallableFunction) => {
        cb();
    }

    const canClose = (value: boolean): void => {
        if (value) {
            toastElem.addEventListener('click', () => {
                isClosed = true;
                remove()
            })
        } else {
            toastElem.removeEventListener('click', () => remove());
        }
    }

    const autoClose = (value: number): void => {
        if (!value) return;
        if (isClosed) return;
        setTimeout(() => {
            onClose(options.onClose);
            remove();
        }, value)
    }

    const showProgress = (value: boolean) => {
        toastElem.classList.toggle('progress', value);
        toastElem.style.setProperty('--progress', '1');
        if (value) {
            setInterval(() => {
                const timeVisible: number = +(new Date()) - +visibleSince;
                toastElem.style.setProperty(
                    '--progress',
                    String(timeVisible / options.autoClose)
                );
            }, 10);
        }
    }

    const color = (value: string) => {
        if (value === 'success') {
            toastElem.style.setProperty('--toast-background-color', '#88B04B');
            toastElem.style.setProperty('--toast-progress-color', '#88B04B');
        }
        if (value === 'error'){
            toastElem.style.setProperty('--toast-background-color', '#FF6F61');
            toastElem.style.setProperty('--toast-progress-color', '#DD4124');
        }
    }

    const show = () => {
        position(options.position);
        text(options.text);
        canClose(options.canClose);
        autoClose(options.autoClose);
        showProgress(true);
        color(options.type);
        
    }

    

    return {
        options,
        show,
    }
}

export default useToast;