class CustomerRegistrationId {
  #id = null;

  set id(data) {
    this.#id = data;
  }

  get id() {
    return this.#id;
  }
}

export default new CustomerRegistrationId();
