function addPublishedEntry(rootNode, entryMetadata, current_post_marker, index) {
   let p = document.createElement("p");
   p.style = 'margin-bottom:10px';

   let suffix = document.location.pathname.endsWith(entryMetadata.url) ? ` ${current_post_marker}` : "";
   p.innerHTML = `<a href="${entryMetadata.url}">${index}. ${entryMetadata.description}${suffix}</a>`;
            
   rootNode.appendChild(p);
}


function addUnpublishedEntry(rootNode, entryMetadata, current_post_marker, index) {
   let p = document.createElement("p");
   p.style = 'margin-bottom:10px';
   p.innerHTML = `${index}. ${entryMetadata.description} ${current_post_marker}`;
   rootNode.appendChild(p);
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
        let current_post_marker = postEntries.current_post_msg;
        for(let entryMetadata of postEntries.toc_entries) {
        	if (typeof entryMetadata.url !== 'undefined')
               addPublishedEntry(parentNode, entryMetadata, current_post_marker, index);
            else {
               addUnpublishedEntry(parentNode, entryMetadata, current_post_marker, index);
               current_post_marker = "";
            }
            index++;
        }

        //alert(document.location.pathname);
     } else {
        parentNode.appendChild(document.createTextNode(`Error while retrieving TOC json from ${tocJsonUrl}<br/>Error:${xhttp.responseText}`));
     }
   };
  
  xhttp.send();
}
