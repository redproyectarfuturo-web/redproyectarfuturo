module.exports = function(eleventyConfig) {
  // Copiar archivos estáticos
  eleventyConfig.addPassthroughCopy("imagenes");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("LOGO-RED.png");

  // Colecciones
  eleventyConfig.addCollection("notas", function(collectionApi) {
    return collectionApi.getFilteredByGlob("notas/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("documentos", function(collectionApi) {
    return collectionApi.getFilteredByGlob("documentos/*.md");
  });

  // Filtro de fecha
  eleventyConfig.addFilter("fechaFormato", function(date) {
    const d = new Date(date);
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return d.toLocaleDateString('es-AR', opciones);
  });

  eleventyConfig.addFilter("truncate", function(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["md", "html", "njk"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
