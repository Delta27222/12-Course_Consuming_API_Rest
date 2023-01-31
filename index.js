const API_Random = 'https://api.thecatapi.com/v1/images/search?limit=15&api_key=live_eQusNx1utqSZ7y1hKIYobmTIen5UJ0RmdsZmEPdyfWZSnyVs0mIBA9tzvW9aOT5w';
const API_Favorites = 'https://api.thecatapi.com/v1/favourites';
const API_Uploads = 'https://api.thecatapi.com/v1/images/upload';
const API_My_Uploads = 'https://api.thecatapi.com/v1/images/';

const API_Delete_Fav = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_eQusNx1utqSZ7y1hKIYobmTIen5UJ0RmdsZmEPdyfWZSnyVs0mIBA9tzvW9aOT5w`;

const spanError = document.getElementById('error');

async function load_Random_Cats(){
    const div_button_img = document.getElementById('button_img');
    const div_message_img = document.getElementById('div_message_img');
    if(div_button_img !== null){
        div_message_img.style.display = "none";

        const resolve = await fetch(API_Random);
        const data = await resolve.json();
        console.log('load_Random_Cats - Data');
        // console.log(data);
    
        if(resolve.status !== 200){
            console.log('load_Random_Cats - EROR');
            spanError.innerHTML = 'Hubo un error: ' + resolve.status;
            const section_succes = document.getElementById('section_notification_error');
            section_succes.style.display = "flex";
    
            const btn1 = document.getElementById('btn_cerrar_error')
            btn1.onclick = () => cerrar(1);
        }else{
            const myList = Array.from(document.querySelectorAll('#button_img'));

            for (var i = 0; i < myList.length; i++) {
                const lists_btn_img = myList[i].childNodes;

                const btn = lists_btn_img[0];
                const img = lists_btn_img[1];

                btn.setAttribute("id_img", data[i].id);
                btn.onclick = () => save_Favorites_Cat(btn.getAttribute('id_img'));

                img.src = data[i].url;
            }
        }
    }else{
        div_message_img.style.display = "flex";
    }
}

async function load_Favorites_Cats(){
    const resolve = await fetch(API_Favorites, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_eQusNx1utqSZ7y1hKIYobmTIen5UJ0RmdsZmEPdyfWZSnyVs0mIBA9tzvW9aOT5w',
            },
        });
        const data = await resolve.json();
        console.log('load_Favorites_Cats - Data');
        // console.log(data);
        if(resolve.status !== 200){
                console.log('load_Favorites_Cats - EROR');
                spanError.innerHTML = 'Hubo un error: ' + resolve.status;
                const section_succes = document.getElementById('section_notification_error');
                section_succes.style.display = "flex";

                const btn1 = document.getElementById('btn_cerrar_error')
                btn1.onclick = () => cerrar(1);
            }else{
                if(data.length != 0){
                    //Aca dejamos de mostrar el mensaje de que no tiene imagenes favoritas
                    const div_message = document.getElementById('div_message');
                    div_message.style.display = "none";
                    // Aca borramos lo que tenemos en los fav
                    const secciton_img_button = document.getElementById('fav_img_section');
                    secciton_img_button.innerHTML = '';

                    data.forEach(cat => {
                        //Encontramos la seccion que contendra a todos los elementos
                        const section = document.getElementById('fav_img_section');

                        //Creamos cada uno de los elementos que compondran a la imagen que se selecciono como fav
                        const div = document.createElement('div');
                        const button = document.createElement('button');
                        const img = document.createElement('img');

                        //Agregamos las caracteristicas de de los elementos que acabamos de crear
                        const btnText = document.createTextNode('❌')

                        //Empezamos a hacer la union de todos los elementos que se acaban de crear
                            //Boton con texto
                            button.appendChild(btnText);
                            //Imagen del gato a el elememto img
                            img.src = cat.image.url;
                            //Llenamos el DIV contenedor
                            div.appendChild(button);
                            div.appendChild(img);
                            //Meter en el SECTION lo que acabamos de crear
                            section.appendChild(div)

                        //Aca agregamos los id de cada elemento creado, de modo que los estilos le funcionen
                            div.setAttribute("id", "button_img_fav");
                            button.onclick = () => delete_Favorite_Cat(cat.id)
                    });
                }else{
                    //Aca mostramos el mensaje de que no tiene imagenes favoritas
                    const div_message = document.getElementById('div_message');
                    div_message.style.display = "flex";
                }
            }
}

async function save_Favorites_Cat(id){
        const resolve = await fetch(API_Favorites, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'X-API-KEY': 'live_eQusNx1utqSZ7y1hKIYobmTIen5UJ0RmdsZmEPdyfWZSnyVs0mIBA9tzvW9aOT5w',
            },
            body: JSON.stringify({
                image_id: id,
            }),
        });
        const data = await resolve.json();
        console.log('Save_Favorites_Cat - Data');
        // console.log(resolve)
        if(resolve.status !== 200){
            console.log('Save_Favorites_Cat - EROR');
            spanError.innerHTML = 'Hubo un error: ' + resolve.status;
            const section_succes = document.getElementById('section_notification_error');
            section_succes.style.display = "flex";

            const btn1 = document.getElementById('btn_cerrar_error')
            btn1.onclick = () => cerrar(1);
        }else{
            const spanSuccess = document.getElementById('success')
            spanSuccess.innerHTML = 'Se ha agregado el gato a Favoritos';
            const section_succes = document.getElementById('section_notification_success');
            section_succes.style.display = "flex";

            const btn1 = document.getElementById('btn_cerrar_success')
            btn1.onclick = () => cerrar(2);
            load_Favorites_Cats();
        }
}

async function delete_Favorite_Cat(id){
    const resolve = await fetch(API_Delete_Fav(id), {
        method: 'DELETE'
    });
    const data = await resolve.json();
    console.log('Delete_Favorites_Cat - Data');
    // console.log(resolve);
    if(resolve.status !== 200){
        console.log('Delete_Favorites_Cat - EROR');
        spanError.innerHTML = 'Hubo un error: ' + resolve.status;
        const section_succes = document.getElementById('section_notification_error');
        section_succes.style.display = "flex";

        const btn1 = document.getElementById('btn_cerrar_error')
        btn1.onclick = () => cerrar(1);
    }else{
        const spanSuccess = document.getElementById('success')
        spanSuccess.innerHTML = 'Se ha eliminado gato de Favoritos';
        const section_succes = document.getElementById('section_notification_success');
        section_succes.style.display = "flex";

        const btn1 = document.getElementById('btn_cerrar_success')
        btn1.onclick = () => cerrar(2);
        const secciton_img_button = document.getElementById('fav_img_section');
        secciton_img_button.innerHTML = '';
        load_Favorites_Cats();
    }
}

async function uploadCatPhoto(){
    const form = document.getElementById('upload_cat');
    const formData = new FormData(form);
    console.log(formData.get('file'));
    const resolve = await fetch(API_Uploads, {
        method: 'POST',
        headers:{
            'X-API-KEY': 'live_eQusNx1utqSZ7y1hKIYobmTIen5UJ0RmdsZmEPdyfWZSnyVs0mIBA9tzvW9aOT5w',
        },
        body: formData,
    });
        const data = await resolve.json();
        save_Favorites_Cat(data.id);

    if(resolve.status !== 200 && resolve.status !== 201){
        console.log('Upload_Cat - EROR');
        spanError.innerHTML = 'Hubo un error: ' + resolve.status + ' al subir la imagen';
        const section_succes = document.getElementById('section_notification_error');
        section_succes.style.display = "flex";

        const btn1 = document.getElementById('btn_cerrar_error')
        btn1.onclick = () => cerrar(1);
    }else{
        const spanSuccess = document.getElementById('success')
        spanSuccess.innerHTML = 'Se a subido la imagen con exito';
        const section_succes = document.getElementById('section_notification_success');
        section_succes.style.display = "flex";
        const btn1 = document.getElementById('btn_cerrar_success')
        btn1.onclick = () => cerrar(2);
        const secciton_img_button = document.getElementById('fav_img_section');
        secciton_img_button.innerHTML = '';
        load_Favorites_Cats();
    }
}

function create_new_img_container(){
    //Encontramos la seccion que contiene a las imagenes randoms
    const img_section = document.getElementById('img_section');

    //Creamos los componenetes que necesitamos, estos iran dentro de la img_section
        const div_button_img = document.createElement('div');
        const button =  document.createElement('button');
        const img = document.createElement('img');

    //Agregamos las caracteristicas de de los elementos que acabamos de crear
        const btnText = document.createTextNode('🌟')

    //Empezamos a hacer la union de todos los elementos que se acaban de crear
        //Boton con texto
        button.appendChild(btnText);
        //Imagen del gato a el elememto img
        // img.src = 'https://cdn2.thecatapi.com/images/as.jpg';

    //Unimos cada uno de los elemntos, en la estrcutura que necesitamos
        div_button_img.appendChild(button);
        div_button_img.appendChild(img);

        //Meter en el SECTION lo que acabamos de crear
        img_section.appendChild(div_button_img);

        //Aca agregamos los id de cada elemento creado, de modo que los estilos le funcionen
        img_section.setAttribute("id", "img_section");
        div_button_img.setAttribute("id", "button_img");
        button.setAttribute("id", "btnRam");
        img.setAttribute("id", "img_random");

        load_new_image_cat(img, button);
        mensaje_img();
}

async function load_new_image_cat(img, button){
    const resolve = await fetch(API_Random);
    const data = await resolve.json();
    if(resolve.status !== 200){
        console.log('load_Random_Cats - EROR');
        spanError.innerHTML = 'Hubo un error: ' + resolve.status;
        const section_succes = document.getElementById('section_notification_error');
        section_succes.style.display = "flex";

        const btn1 = document.getElementById('btn_cerrar_error')
        btn1.onclick = () => cerrar(1);
    }else{
        img.src = data[0].url;
        button.setAttribute("id_img", data[0].id);
        button.onclick = () => save_Favorites_Cat(data[0].id);
    }
}

function cerrar(numero){
    if (numero == 1){ //Se deja de mostrar a la seccion del error
        const section_error = document.getElementById('section_notification_error');
        section_error.style.display = "none";
    }else{
        if (numero == 2){//Se deja de mostrar a la seccion del success
            const section_succes = document.getElementById('section_notification_success');
            section_succes.style.display = "none";
        }
    }
}

function mensaje_img(){
    const div_button_img = document.getElementById('button_img');
    const div_message_img = document.getElementById('div_message_img');
    if(div_button_img.length !== 0){
        div_message_img.style.display = "none";
    }else{
        div_message_img.style.display = "flex";
    }
}


load_Random_Cats();
load_Favorites_Cats();