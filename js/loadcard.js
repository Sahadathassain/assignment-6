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
      <div class="card p-4" style="height: 524px;">
        <img src="${tool.image}" class="card-img-top rounded-2 mx-auto my-2" alt="${tool.name}" style="height: 200px;">          
        <div>
        <h4>Features</h4>
        <ol class=" ms-3 ps-1 pe-0 fs-6">
        ${tool.features === null ? "No Feature" : `${tool.features
          .map(
            (data) =>`<li >${data} 
            </li>`
          )
            .join("")
        } `
        } 

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
  <div class="d-block d-md-flex">
  <div class="bg-warning-subtle w-100">
  <h4 class=" m-3 fs-5 ">
  ${data.data.description}
  </h4>
  <div class="d-flex justify-content-between mx-1 text-white rounded-3">
  <div class="fs-5 ps-2 pt-2 pe-2 bg-danger rounded-3 mx-1">
  <h5>
  ${
  data.data.pricing === null ? " " : data.data.pricing[0].plan}</h5>
  <h5>
  ${
    data.data.pricing === null ? "Free of cost/Basic" : data.data.pricing[0].price}
  </h5>
  </div>
  <div class="fs-5 ps-2 pt-2 pe-2 bg-danger rounded-3 mx-1">
  <h5>
  ${
  data.data.pricing === null ? " " : data.data.pricing[1].plan}</h5>
  <h5>
  ${
    data.data.pricing === null ? "Free of cost/Basic" : data.data.pricing[1].price}
  </h5>
  </div>
  <div class="fs-5 bg-danger ps-2 rounded-3 mx-1">
  <h5>
  ${
  data.data.pricing === null ? " " : data.data.pricing[2].plan}</h5>
  <h5>
  ${
    data.data.pricing === null ? "Free of cost/Basic" : data.data.pricing[2].price}
  </h5>
  </div>

  </div>
  <div  class="d-flex  mx-3 justify-content-between">
  <div>
  <h4>Features</h4>
  <ul class=" ms-3 ps-1 pe-0 fs-6">
 <li> 
 ${data.data.features === null ? "No Feature" : data.data.features[1].feature_name}
 </li>
 <li> 
 ${data.data.features === null ? "No Feature" : data.data.features[2].feature_name}
 </li>
 <li> 
 ${data.data.features === null ? "No Feature" : data.data.features[3].feature_name}
 </li>
        
  </ul>  
  </div>
  <div>
  <h4>Integrations</h4>
  <ul class="list-group ms-3 ps-1 pe-0 fs-6">
  ${data.data.integrations === null ? "No Feature" : `${data.data.integrations
    .map(
      (data) =>`<li >${data} 
      </li>`
    )
      .join("")
  } `
  } 
        
  </ul>  
  </div>
  </div>                              
  </div>
  <div class="bg-info-subtle ms-md-3 mt-3 mt-md-0 p-1 pe-0 fs-6 w-100">
  <p class="position-absolute top-0 end-0 bg-danger-subtle  me-4 py-1 px-2 mt-4 rounded">
  ${data.data.accuracy === null ? " ": data.data.accuracy.score * 100 + "% " + "Accuracy"}
  </p>
  <img src="${data.data.image_link[0]}" class="rounded-2 mx-auto w-100 my-2" alt="${data.data.image_link[0]}" style="height:250px;"> 
  <h5 class="text-center fs-4">
  ${data.data.input_output_examples === null ? "Can you give any example" : data.data.input_output_examples[0].input}
  </h5>
  <p class="text-center"> ${data.data.input_output_examples === null ? "No! No yet, Take a break " : data.data.input_output_examples[0].output}
 </p>
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