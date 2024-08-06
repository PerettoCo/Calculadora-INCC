var input = document.querySelectorAll('.date')[0];
  
var date = function date(elm) {
  elm.addEventListener('keypress', function(e) {
    if(e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    
    var len = elm.value.length;
    
    // deixar o usuario digitar a /
    if(len !== 1 ) {
        //se for a / digitada 
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
    
    // Adiciona a / para o user depois do mês
    if(len === 2) {
      elm.value += '/';
    }

    
    
  });
};
  
date(input);


 



const form = document.getElementById('form')
const valorInicial = document.getElementById('valorInicial')
const dataInicial = document.getElementById('dataInicial')
const valores = []
const selectedMonths = []



    form.addEventListener('submit', e => {
      e.preventDefault()
      fazcalculolouco()
      sincMonth()
    } )

 async function pegaDados(){
    //valor 1 * primeiro mes taxa ->  joga valor em uma lista pode ser
    // pega ultimo valor da lista, +1 no mes / lista de taxas do proximo mes
    // faz a mesma coisa até chega no date month and year, função pra pegar a data atual de hoje
    
    //pega valores dos campos do form
    x = valorInicial.value
    valores.push(Number(x))
    console.log(valores[0])

    y = dataInicial.value

    //trata eles para pegar os numeros necessarios para acessar dentro do array a data inicial
    month = y.slice(0,2) - 1
    year = y.slice(3)
    

    //pega o ano atual para comparação
    const data = new Date()
    let anoAtual = data.getFullYear()
    
    //se o ano for maior ou menor que o intervalo de anos na planilha avisar
    if(year < 2020  || year > anoAtual  || month < 0 || month > 11){
      alert("Digite uma data válida - 01/2020 - data atual - ")
    } else{

      //cria a url e faz um Get request para o endpoint
      const url = "https://script.google.com/macros/s/AKfycbx8sZSiBcm3wfSnn8p9u7tHeONH3nR04NP9y6V-iTYWuo-gC_3ieMoVqsuoa2nFILRqRA/exec"

      //pega o retorno do fetch esperando com o await e trata os dados de json para javascript
      const dados = await fetch(url)
      const dadosJson = await dados.json()

      
  
     
      //para cada ano faça
     for ( year; year < anoAtual; year++){
      //pega o ultima numero do ano
     let yearSliced = String(year).slice(3);
      //for para cada mes faça
      for( month; month < 12; month++){
        //pega a partir do ano e mes até o final
        selectedMonths.push(dadosJson[yearSliced][month])
        //console.log(dadosJson[yearSliced][month])
      }
      month = 0
      
      yearSliced = yearSliced++
      
      
     }
     return selectedMonths
  
    }

    
   
    


   // console.log(x , y)
   // x = x + (x * (taxasMes[0] /100))

    //console.log(x)


   


}


 async function fazcalculolouco(){
  let retorno = await pegaDados()
  console.log(selectedMonths.length)
  //calculo
    //Parcela mês (ex R$2.000,00 + Incc-M 0.25%)  = R$ 2.005,00
    //No próximo mês e 2.005,00 + a incc do mês …
    for( let i=0; i < selectedMonths.length; i++){

        let parcelaMes = 0
        console.log(i)
        
            //console.log('calculando!')
            parcelaMes = valores[i] + (valores[i] * (0.25/100))
            valores.push(parcelaMes)
        
      
      
      console.log(valores[i])
    }

}



let mes = 5
let ano = 2022
const taxasDosMeses = [ 1,2, 3, 4, 5, 6, 7, 8, 1,2,3,4,5,6,7,8,9,10,11,12]

function sincMonth(){
for ( let taxa in taxasDosMeses){
  if ( mes > 12){
    ano += 1
    mes = 1

  }
  taxa = "Parcela "+ mes + "/" + ano +  " -- " + taxasDosMeses[taxa]
  console.log(taxa)
  mes += 1
}

}