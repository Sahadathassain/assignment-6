const loadTools = (dataLimit) => {
  toggleSpinner(true);
  fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => {
      toggleSpinner(false);
      showTools(data.data.tools, dataLimit);
    });
};

const showTools = (tools, dataLimit) => {
  const toolsContainer = document.getElementById('tools-container');
  const showAll = document.getElementById('show-all');
  let shownTools = dataLimit && tools.length > dataLimit ? tools.slice(0, dataLimit) : tools;
  
  shownTools.forEach(tool => {        
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col');
    toolDiv.innerHTML = `
      <div class="card p-4 ">
        <img src="${tool.image}" class="card-img-top rounded-2 mx-auto my-2" alt="${tool.name}" style="height: 200px;">          
        <div>
        <h4>Features</h4>
        <ol class=" ms-3 ps-1 pe-0 fs-6">
        <li>${tool.features[0] ? tool.features[0]:'No Features'}</li>
        <li>${tool.features[1] ? tool.features[1]:'No Features'}</li>
        <li>${tool.features[2] ? tool.features[2]:'No Features'}</li>
        <li>${tool.features[3] ? tool.features[3]:'No Features'}</li>
        </ol>                
          </div>
          <hr>
          <div class="d-flex justify-content-between m-0">
          <div>
          <h4>${tool.name}</h4>
          <p><i class="fa-solid me-2 fa-calendar-days"></i>${tool.published_in}</p>
          </div>
        <button onclick="showModals('${tool.id}')" class="border-0 text-danger p-1 bg-white" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid rounded-4 fa-right-long"></i></button>
          </div>
      </div>
    `;
    toolsContainer.appendChild(toolDiv);
    
  });

  
  if(dataLimit && tools.length > dataLimit) {
    showAll.classList.remove('d-none');
  }
  else{
    showAll.classList.add('d-none');
  }

  showAll.addEventListener('click', function(){
    toolsContainer.innerHTML = '';
    showTools(tools);
  });


};
const showModals = async id =>{
  const url=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
  console.log(url);
  const res = await fetch(url);
  const data =await res.json();
  displayToolsDetails(data);
}
const displayToolsDetails = data =>{
  console.log(data);
  const toolsDetails = document.getElementById('model-description');
  toolsDetails.innerHTML = `
  <div class="d-flex">
  <div class="bg-warning-subtle w-50">
  <h4 class=" m-3 fs-5 ">
  ${data.data.description}
  </h4>
  <div class="d-flex justify-content-between mx-1 text-primary rounded-3">
  <h5 class="fs-5 mx-1">
  ${data.data.pricing[0].price + ' <br> ' + data.data.pricing[0].plan ? data.data.pricing[0].price + ' <br> ' + data.data.pricing[0].plan :'Free of cost'}
  </h5>
  <h5 class="fs-5 mx-1">
  ${data.data.pricing[1].price + ' <br> ' + data.data.pricing[1].plan ? data.data.pricing[1].price + ' <br> ' + data.data.pricing[1].plan :'Free of cost'}
  </h5>
  <h5 class="fs-5 mx-1">
  ${data.data.pricing[2].price + ' <br> ' + data.data.pricing[2].plan ? data.data.pricing[2].price + ' <br> ' + data.data.pricing[2].plan :'Free of cost'}
  </h5>
  </div>
  <div  class="d-flex  mx-3 justify-content-between">
  <div>
  <h4>Features</h4>
  <ul class=" ms-3 ps-1 pe-0 fs-6">
        <li>${data.data.features[1].feature_name ? data.data.features[1].feature_name :'No Features'}</li>
        <li>${data.data.features[2].feature_name ? data.data.features[2].feature_name :'No Features'}</li>
        <li>${data.data.features[3].feature_name ? data.data.features[3].feature_name :'No Features'}</li>
        </ul>  
  </div>
  <div>
  <h4>Integrations</h4>
  <ul class=" ms-3 ps-1 pe-0 fs-6">
        <li>${data.data.integrations[0] ? data.data.integrations[0] :'No integrations'}</li>
        <li>${data.data.integrations[1] ? data.data.integrations[1] :'No integrations'}</li>
        <li>${data.data.integrations[2] ? data.data.integrations[2] :'No integrations'}</li>
        
        </ul>  
  </div>
  </div>                              
  </div>
  
  `
}




const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    setTimeout(() => {
      loaderSection.classList.add('d-none');
    }, 1000);
  }
};





loadTools(6);