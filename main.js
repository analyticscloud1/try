var ajaxCall = (query, language) => {
  console.log(query);
  console.log(language);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/embedding",
      type: "POST",
      data: JSON.stringify({
        query: query,
        language: language
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      // crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr });
      },
      error: function (xhr, status, error) {
        const err = new Error('xhr error');
        err.status = xhr.status;
        reject(err);
      },
    });
  });
};


(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
    async post(query, language) {
      const { response } = await ajaxCall(
        query,
        language
      );
      //console.log(response.choices[0].text);
      return response;
    }
  }
  customElements.define("custom-widget", MainWebComponent);
})();