import Template from '@templates/Template.js';
//Añadiendo el CSS
import '@styles/main.css';
//Añadiendo el Styls
import '@styles/vars.styl';

(async function App() {
    const main = null || document.getElementById('main');
    main.innerHTML = await Template();
})();