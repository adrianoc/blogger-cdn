function addPublishedEntry(rootNode, entryMetadata, index) {
   let a = document.createElement("a");
   a.href = entryMetadata.url;
   let suffix = entryMetadata.url === document.location.pathname ? " (this post)" : "";
   a.innerHTML = `${index}. ${entryMetadata.description}${suffix}<br/>`;
            
   rootNode.appendChild(a);
}


function addUnpublishedEntry(rootNode, entryMetadata, index) {
   let span = document.createElement("span");
   span.innerHTML = `${index}. ${entryMetadata.description}<br/>`;
   rootNode.appendChild(span);
}

function populateToc(tocJsonUrl, tocNodeId) {
  const xhttp = new XMLHttpRequest();
 
  xhttp.open("GET", tocJsonUrl, true);
  
  xhttp.onreadystatechange = () => {
    
     if (xhttp.readyState !== XMLHttpRequest.DONE)
       return;
     
     var parentNode = document.getElementById(tocNodeId);
     
   	 const status =xhttp.status;
     if (status === 0 || (status >= 200 && status < 400)) {
        // The request has been completed successfully
        let postEntries = JSON.parse(xhttp.responseText);
        
        let index = 1;
        for(let entryMetadata of postEntries.toc_entries) {
        	if (typeof entryMetadata.url !== 'undefined')
               addPublishedEntry(parentNode, entryMetadata, index);
            else
               addUnpublishedEntry(parentNode, entryMetadata, index);
            index++;
        }

        //alert(document.location.pathname);
     } else {
        parentNode.appendChild(document.createTextNode(`Error while retrieving TOC json from ${tocJsonUrl}<br/>Error:${xhttp.responseText}`));
     }
   };
  
  xhttp.send();
}
