const data = [{
    tittle:'Aprendiendo JS',
    year:'2021',
    id:'90',
    author:'Camilo Jose'
  }, {
    tittle:'Aprendiendo Python',
    year:'2023',
    id:'1',
    author:'Milena camila'
  },{
    tittle:'Aprendiendo HTML y CSS',
    year:'2022',
    id:'2',
    author:'Simon Azocar'
  }];
  
  function getData(){
    return new Promise((resolve,reject) => {
      if(data.length == 0 ){
        reject(new Error('Data is empty'));
      }
      setTimeout(() => {
        resolve(data);
      },2000)
    })
  }
  
  async function fetchingData(){
    const books = await getData();
    console.log(books);
  }
  
  fetchingData()
  
  