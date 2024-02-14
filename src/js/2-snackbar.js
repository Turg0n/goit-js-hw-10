import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('form');
const numberInput = document.querySelector('[type=number]');

form.addEventListener('submit', onSubmitBtnClick);

function onSubmitBtnClick(e) {
    e.preventDefault();

    const makePromise = () => {
        return new Promise((resolve, reject) => {
            const delay = numberInput.value;
            const shouldResolve = form.elements.state.value === 'fulfilled';

            setTimeout(() => {
                if (shouldResolve) {
                    resolve(delay); 
                } else {
                    reject(delay); 
                }
            }, delay);
        });
    };
    
    makePromise()
    .then(value =>
        iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        close: false,
        progressBar: false,
        class: '.snackbar-izitoast',
        })
    )
    .catch(error =>
        iziToast.show({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        close: false,
        progressBar: false,
        class: '.snackbar-izitoast',
        })
    );

form.reset();
};

