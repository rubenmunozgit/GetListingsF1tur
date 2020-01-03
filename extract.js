const extractBusinessInfo = (businesses) => {
  return businesses.map(business => {
    return {
      id: business.id,
      nombre: business.no,
      stand: business.st,
      web: business.we,
      //description: business.dc,
      email: business.em,
      sector: (business.lse !== null ? business.lse[0].v : ''),
      persona: business.pe,
      telefono: business.tl,
      direccion: business.di,
      provincia: business.pr,
      pais: business.pa
    }
  });
};

module.exports = {
  extractBusinessInfo
}