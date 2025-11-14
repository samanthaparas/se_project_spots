class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "686618b0-d798-4a93-9160-cb13652c4430",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

export default Api;
// export the class
