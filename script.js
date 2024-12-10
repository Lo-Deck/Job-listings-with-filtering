

function displayList(obj){

    let returnValue = ``;

    returnValue = `<li><button class="button select role" data-role="${obj.role}">${obj.role}</button></li>
                    <li><button class="button select level" data-level="${obj.level}">${obj.level}</button></li>`;

    for(const key in obj){

        if(key === 'languages' || key === 'tools'){

            for(const value of obj[key]){

                returnValue += `<li><button class="button select level" data-${key}="${value}" >${value}</button></li>`;

            }

        }

    }

    return returnValue;

}


function clearItem(btn){

    let btnClearKey;
    let btnClearValue;

    for(const key in btn.dataset){ // extract data from the clicked button
        btnClearKey = key;
        btnClearValue = btn.dataset[key];
    }


    for(const key in document.querySelector('.tag-selected').dataset){  // delete the data-* 
  
        if( document.querySelector('.tag-selected').dataset.hasOwnProperty(`${btnClearKey}`) ){

            let array =  document.querySelector('.tag-selected').dataset[key].split(',');

            if(array.includes(btnClearValue)){
                array = array.filter( (value) => value !== btnClearValue );
                document.querySelector('.tag-selected').dataset[key] = array;
            }

            if(!array.length)
            {
                delete document.querySelector('.tag-selected').dataset[btnClearKey];
            }

        }

    }


    let isDisplay = true;

    document.querySelectorAll('.container-section.hidden').forEach( (element) => {

            for(const sectionKey in document.querySelector('.tag-selected').dataset){

                if( element.dataset.hasOwnProperty(sectionKey) ){

                    const array = element.dataset[sectionKey].split(',');

                    if(array.includes(document.querySelector('.tag-selected').dataset[sectionKey])){
                        isDisplay = true;
                    }

                    else{
                        isDisplay = false;
                        break;
                    }

                }

            }

            if(isDisplay){
                element.classList.remove('hidden');
            }

    });


    btn.parentElement.remove();

    if(document.querySelectorAll('.li-selected').length === 0){
        document.querySelector('.tag-selected').style.display = 'none';
    }

}




async function fetchData () {

    try{

        response = await fetch('./data.json', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            throw(`Error loading data : ${response.status}`);
        }

        const data = await response.json();

        return data;

    }
    catch(error){
        console.error('Error: ', error);
    }

}


fetchData().then( data => {

    const array = data;

    for(let item of array){


        const element = document.createElement('section');

        element.classList.add('container-section');

        element.setAttribute('data-role', item.role);
        element.setAttribute('data-level', item.level);
        element.setAttribute('data-languages', item.languages);
        element.setAttribute('data-tools', item.tools);

        element.innerHTML = `<img class="logo" src=${item.logo} alt="logo brand">

            <div class="container-text">
                                                                            
            <h2 class="presentation text-bold"><span class='title'>${item.company}</span>${item.new ? '<span class="new">New!</span>' : ''}${item.featured ? '<span class="featured">Featured</span>' : ''}</h2>
            <p class="job text-bold">${item.position}</p>
            <ul class="list category text"> 
                <li class="time">${item.postedAt}</li>
                <li class="working-time">${item.contract}</li>
                <li class="location">${item.location}</li>
            </ul>

            </div>

            <hr class="line">

            <ul class="list list-tags text-bold">
                ${displayList(item)}
            </ul>`;

        document.querySelector('.main-container').insertAdjacentElement('beforeend', element);

    }




    const btnSelect = document.querySelectorAll('.select');

    btnSelect.forEach( (item) => {

        item.addEventListener('click', () => {

            const getBtnData = item.dataset;

            let keyBtn;
            let valueBtn;

            for(const key in getBtnData){ // extract data from the clicked button

                keyBtn = key;
                valueBtn = getBtnData[key];

            }


        /* CREATE SELECTED BTN */

            if( document.querySelector('.tag-selected').style.display !== 'flex' ){
                document.querySelector('.tag-selected').style.display = 'flex';
            }

            if( !document.querySelector('.tag-selected').dataset.hasOwnProperty(`${keyBtn}`) ){

                document.querySelector('.tag-selected').setAttribute(`data-${keyBtn}`, valueBtn);// create data-* to loop it later

                const addLi = document.createElement('li');
                addLi.classList.add('li-selected');
                addLi.innerHTML = `<span class="select">${valueBtn}</span>
                                   <button class="button clear-item" onclick='clearItem(this)'   data-${keyBtn}="${valueBtn}"   ><img src="./images/icon-remove.svg" alt="clear item"></button>`;

                document.querySelector('.tag-selected .list-tags').insertAdjacentElement('beforeend', addLi); 
                
            }
            else if( keyBtn === 'languages' || keyBtn === 'tools' ){

                const arrayData = document.querySelector('.tag-selected').dataset[keyBtn].split(',');// split array to find whether the value is inside

                if(!arrayData.includes(valueBtn)){

                    arrayData.push(valueBtn);

                    document.querySelector('.tag-selected').setAttribute(`data-${keyBtn}`, arrayData);

                    const addLi = document.createElement('li');
                    addLi.classList.add('li-selected');
                    addLi.innerHTML = `<span class="select">${valueBtn}</span>
                                       <button class="button clear-item" onclick='clearItem(this)'   data-${keyBtn}="${valueBtn}"    ><img src="./images/icon-remove.svg" alt="clear item"></button>`;

                    document.querySelector('.tag-selected .list-tags').insertAdjacentElement('beforeend', addLi); 

                }

            }


            /* SORT SELECTED SECTION */

            document.querySelectorAll('.container-section:not(hidden)').forEach( (element) =>{

                for(const key in element.dataset){

                    if(keyBtn === key){

                        const array = element.dataset[key].split(','); // split up different value

                        if(!array.includes(valueBtn)){

                            element.classList.add('hidden');

                        }

                    }

                }

            });


        });//end click listener
     
    });//end btn.forEach

});


/* BTN CLEAR ALL */

document.querySelector('.clear-all').addEventListener('click', () => {

    for(const key in document.querySelector('.tag-selected').dataset){  // reset all the data-* 

        delete document.querySelector('.tag-selected').dataset[key];

    }

    document.querySelectorAll('.li-selected').forEach( (item) => item.remove() );
    document.querySelectorAll('.container-section').forEach( (item) => item.classList.remove('hidden') );
    document.querySelector('.tag-selected').style.display = 'none';

});


