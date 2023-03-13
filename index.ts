import * as fs from 'fs';

let writeStream = fs.createWriteStream('countries.csv')
interface Countries{
  name: string,
  population: number,
  area: number,
  density: number
}

const filename = 'countries.txt';
const content: string = fs.readFileSync(filename, 'utf-8');
const rowData: string[] = content.split('\n')
const countries: Countries[]  = rowData.map((countrie)=>{

// Separo los datos por espacios en blanco

const rowCountry: string[] = countrie.trim().split(' ')
const nameCountry: string[] = rowCountry.filter((item)=> !item.match(/\d/))
const name: string = nameCountry.join(' ')
const numbersArray: string[] = rowCountry.filter((item)=> item.match(/\d/))
const obj:Countries = {name:'', population:0, area:0, density:0}

  // elimino los datos erroneos
  if ( numbersArray.length === 2){
  // Creo un objeto para asignar los valores correspondientes
  const population: number = Number(rowCountry[rowCountry.length-2].replaceAll(',',''))
  const area: number = Number(rowCountry[rowCountry.length-1].replaceAll(',',''))
    obj.name= name,
    obj.population = population,
    obj.area= area,
    obj.density= population/area
  }
  return obj
  
})
//Ordeno por densidad
countries.sort((a, b) => b.density - a.density);
console.log(countries)

//Convierto el archivo .txt a csv
countries.forEach((country) => {     
    let newLine = []
    if(country.name && country.population && country.area && country.density){
      newLine.push(country.name)
      newLine.push(country.population)
      newLine.push(country.area)
      newLine.push(country.density)
      writeStream.write(newLine.join(',')+ '\n')
    }
})

writeStream.end()
