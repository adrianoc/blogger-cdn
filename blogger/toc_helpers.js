function addPublishedEntry(rootNode, entryMetadata, current_post_marker) {
   let entryNode = document.createElement("LI");
   entryNode.style = 'padding-bottom:8px';

   let suffix = document.location.pathname.endsWith(entryMetadata.url) ? ` ${current_post_marker}` : "";
   entryNode.innerHTML = `<a href="${entryMetadata.url}">${entryMetadata.description}${suffix}</a>`;
   rootNode.appendChild(entryNode);

   return document.location.pathname.endsWith(entryMetadata.url) ? "" : current_post_marker;
}


function addUnpublishedEntry(rootNode, entryMetadata, current_post_marker) {
   let entryNode = document.createElement("LI");
   entryNode.style = 'padding-bottom:8px';

   entryNode.innerHTML = `${entryMetadata.description} ${current_post_marker}`;
            
   rootNode.appendChild(entryNode);
}

function populateToc(tocJsonUrl, tocNodeId) {
  const xhttp = new XMLHttpRequest();
 
  xhttp.open("GET", tocJsonUrl, true);
  
  xhttp.onreadystatechange = () => {
    
     if (xhttp.readyState !== XMLHttpRequest.DONE)
       return;
     
     var tocRoot = document.getElementById(tocNodeId);
     var parentNode = document.createElement("OL");
     tocRoot.appendChild(parentNode);
     
     const status =xhttp.status;
     if (status === 0 || (status >= 200 && status < 400)) {
        // The request has been completed successfully
        let postEntries = JSON.parse(xhttp.responseText);
        
        let current_post_marker = postEntries.current_post_msg;
        for(let entryMetadata of postEntries.toc_entries) {
        	   if (typeof entryMetadata.url !== 'undefined') {
               current_post_marker = addPublishedEntry(parentNode, entryMetadata, current_post_marker);
            } else {
               addUnpublishedEntry(parentNode, entryMetadata, current_post_marker);
               current_post_marker = "";
            }
        }

        //alert(document.location.pathname);
     } else {
        parentNode.appendChild(document.createTextNode(`Error while retrieving TOC json from ${tocJsonUrl}<br/>Error:${xhttp.responseText}`));
     }
   };
  
  xhttp.send();
}
