const axios = require('axios');
const fs = require('fs');
const { getBusiness, getBusinessDetails } = require('./apiClients/fetchData');
const {timeout} = require('./util/delay');
const {extractBusinessInfo} = require('./mutate/extract');
const {writeTofile} = require('./util/writeToFile');

const url = 'https://seguro.ifema.es/waCatalogoMovil/wsListaExpositores.svc/GetIndiceEmpresasPais?Feria=FT20&tipoBusqueda=TODO&numero=10&pagina=1&Tipoindice=S&idindice=2&{}&_=1576349400712';

const urlBusiness = 'https://seguro.ifema.es/waCatalogoMovil/wsListaExpositores.svc/GetFichaEmpresa?Feria=FT20&Codigo=${id}&stand=&{}&_=1576349400713';


const mapLoop = async (businesses) => {
  console.log('start');
  const promises = businesses.map(async (business, i) => {
    const urldetail = urlBusiness.replace('${id}', business.id);
    await timeout(250*i, urldetail);
    const detail = await getBusinessDetails(urldetail);
    console.log(`req for ${business.id} ends:  ${new Date()}`);
    return detail;
  });
  const results = await Promise.all(promises);
  console.log('end');
  return results;
}

const scrapper = async () => {
  const businesses = await getBusiness(url);
  const businessesDetails = await mapLoop(businesses);
  const extractedDetails = extractBusinessInfo(businessesDetails);
  writeTofile(extractedDetails);
};

scrapper();