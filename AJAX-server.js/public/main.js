    console.log('main.js')
    
    getCSS.onclick = () =>{
    const request = new XMLHttpRequest();
    request.open("GET" , "./style.css");
    request.onload = () => {
        console.log('onload');
        const style = document.createElement('style');
        style.innerHTML = request.response;
        document.head.appendChild(style);
    };
    request.onerror = () =>{
        console.log('onerror');
    };
    request.send();
}