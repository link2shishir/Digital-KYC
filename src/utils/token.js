class Token {
  #state = null;

  set state(data) {
    this.#state = data;
  }

  get state() {
    return this.#state;
  }

  get token() {
    if (!this.#state || !this.#state.token_type || !this.#state.access_token) {
      return {};
    }

    return this.#state.token_type + ' ' + this.#state.access_token;
  }
}

export default new Token();
