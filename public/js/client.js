




const weatherForm = document.querySelector('form');
const inputElement = document.querySelector('input');
const messageData = document.getElementById('info');
const errorParagraph = document.getElementById('error');

messageData.textContent = '';

weatherForm.addEventListener('submit',(eve)=>{
    eve.preventDefault();
    const address = inputElement.value;

    if(!address){
        errorParagraph.textContent = 'Please enter address';
        return; 
    }
    // let isLoading = true;
    messageData.textContent = 'Loading weather data ...'
    errorParagraph.textContent = '';

    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageData.textContent = '';
                errorParagraph.textContent = data.error;
            } else {
                messageData.textContent = `${data.forecast} 
                     ${data.location}`;
            }
            console.log(data);
        });
    });

    // console.log(data);
    console.log(address);

});