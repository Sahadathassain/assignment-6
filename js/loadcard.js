const loadTools = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
      .then(res => res.json())
      .then(data => showTools(data.data.tools));
  };
  
  const showTools = (data) => {
    const toolsContainer = document.getElementById('tools-container');
   
    data.forEach(tool => {
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
          </ol>                
          </div>
            <hr>
            <div class="d-flex justify-content-between m-0">
            <div>
            <h4>${tool.name}</h4>
            <p><i class="fa-solid me-2 fa-calendar-days"></i>${tool.published_in}</p>
            </div>
            
            <button class="border-0 text-danger p-1 bg-white"><i class="fa-solid rounded-4 fa-right-long"></i></button>
            </div>
        </div>
    
      `;
      toolsContainer.appendChild(toolDiv);
    });
  };
  
  loadTools();