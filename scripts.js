/**
 * Your API key: vfub8YmgyfPuZtW4MX3DRKKvTzIXYwH7uvp3JxnHCIWpdrKyWE3NM5cN
 * ----------------------------------------------------------------------------
 */

// parametri necessari per recuperare i dati json
const api = 'https://api.pexels.com/v1/search?query=';
const key = 'vfub8YmgyfPuZtW4MX3DRKKvTzIXYwH7uvp3JxnHCIWpdrKyWE3NM5cN';
const authorization = {
   headers: {
      "Authorization": "vfub8YmgyfPuZtW4MX3DRKKvTzIXYwH7uvp3JxnHCIWpdrKyWE3NM5cN"
   }
}
let typePhotoFirstLoad = 'nature';
let typePhotoSecondLoad = 'ocean';
let typePhotoSearch = 'ocean';

// parametro dove inserirò le mie card
const album = document.querySelector('.album .row');


/**
 * Fn che mi recupera i dati via API
 * ----------------------------------------------------------------------------
 */
const fetchData = async (type) => {

   try {
      const resp = await fetch(api + type, authorization);
      const body = await resp.json();

      createCard(body);
   } catch (error) {
      console.log(error);
   }
}


/**
 * Fn per creare le singole card
 * ----------------------------------------------------------------------------
 */
const createCard = async (elementi) => {

   if (elementi) {

      // const cards = document.querySelectorAll('.card');

      // console.log(elementi)

      album.innerHTML = '';

      for (const card of elementi.photos) {

         console.log(card)

         const column = document.createElement('div');
         column.classList.add('col-md-4');

         column.innerHTML = `
            <div class="card mb-4 shadow-sm">
               <img src="${card.src.landscape}" class="card-img-top img-fluid" alt="${card.alt}">   
               <div class="card-body">
                  <h5 class="card-title mt-auto">Lorem Ipsum</h5>
                  <p class="card-text">
                     This is a wider card with supporting text below as a natural
                     lead-in to additional content. This content is a little bit
                     longer.
                  </p>
                  <div class="d-flex justify-content-between align-items-center">
                     <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">
                           View
                        </button>
                        <button type="button" id="btnHide" class="btn btn-sm btn-outline-secondary">
                           Hide
                        </button>
                     </div>
                     <small class="text-muted">ID: ${card.id}</small>
                  </div>
               </div>
            </div>
         `;

         let btnHide = column.querySelector('#btnHide');
         btnHide.onclick = () => {
            column.remove();
         }

         album.appendChild(column);
      }
   }
}


/**
 * Esecuzione del codice
 * ----------------------------------------------------------------------------
 */
window.onload = () => {
   // console.log('test onload')

   const formSearch = document.querySelector('#formSearch');
   const btnFirstLoad = document.querySelector('#btnFirstLoad');
   const btnSecondLoad = document.querySelector('#btnSecondLoad');

   btnFirstLoad.onclick = () => {
      fetchData(typePhotoFirstLoad);
   }

   btnSecondLoad.onclick = () => {
      fetchData(typePhotoSecondLoad);
   }

   formSearch.onsubmit = (event) => {
      event.preventDefault();
      
      console.log('test');
      typePhotoSearch = formSearch.querySelector('input').value;
      fetchData(typePhotoSearch);
      // formSearch.reset();
      // formSearch.querySelector('input').value = '';
   }

}