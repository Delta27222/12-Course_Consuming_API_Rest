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
    setTimeout(() => {
      data
    },2000)
  }
   console.log(getData());

// Esto esta dando error, puesto que no esta recibiendo nada desde el
// primer instante, y no se esta tomando en cuenta el asincronismo