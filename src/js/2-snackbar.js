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
        const shouldResolve = form.elements.state.value;
        
        setTimeout(() => {
        if (shouldResolve === 'fulfilled') {
            resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
            reject(`❌ Rejected promise in ${delay}ms`);
        }
        }, delay);
    });
    };

    makePromise()
    .then(value =>
        iziToast.show({
        message: value,
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
        message: error,
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

