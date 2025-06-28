document.addEventListener("DOMContentLoaded", async () => {
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  const loadHTML = async (element, url) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      element.innerHTML = data;
    } catch (error) {
      console.error(`Error cargando ${url}:`, error);
    }
  };

  if (headerElement) {
    await loadHTML(headerElement, "../header.html");
  }

  if (footerElement) {
    await loadHTML(footerElement, "../footer.html");
  }
  if (typeof I18N !== "undefined" && typeof I18N.init === "function") {
    I18N.init();
  } else {
    console.warn("El módulo I18N no está definido o no tiene un método init.");
  }
});