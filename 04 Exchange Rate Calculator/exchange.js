class ExchangeRate {
  constructor(currency_one, currency_two) {
    this.api_key = 'd557eb09a967117edeeef345';
    this.currency_one = currency_one;
    this.currency_two = currency_two;
  }

  async calculateExchangeRate() {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${this.api_key}/latest/${this.currency_one}`);
    const resData = await res.json();
    const rate = await resData.conversion_rates[`${this.currency_two}`];
    return rate;
  }
}