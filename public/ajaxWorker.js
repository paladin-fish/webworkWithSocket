// window.createElement = {}
// importScripts('/jquery.js');
onmessage = function (event) {
    let { url, method, data } = event.data;
    console.log('event===',event.data, url, method, data)
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function ()
    {
    if (xhr.readyState==4)
      {// 4 = "loaded"
      if (xhr.status==200)
        {// 200 = OK
        // ...our code here...
        postMessage({
            type:"data",
            msg:xhr.responseText
        });//postMessage发送一个对象
        }
      else
        {
        postMessage({type:'error'})
        }
      }
    }
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.send(JSON.stringify(data))
}