// now support only cash
export enum PaymentMethod {
  Cash = 'CASH',
}

export enum MoneyType {
  Coin = 'COIN',
  BankNote = 'BANK_NOTE',
}

// can add more when have other currency
export enum MoneyCode {
  Coin1Bath = 'COIN_1_BATH',
  Coin5Bath = 'COIN_5_BATH',
  Coin10Bath = 'COIN_10_BATH',
  Bank20Bath = 'BANK_20_BATH',
  Bank50Bath = 'BANK_50_BATH',
  Bank100Bath = 'BANK_100_BATH',
  Bank500Bath = 'BANK_500_BATH',
  Bank1000Bath = 'BANK_1000_BATH',
}

// for support multi-currency
export enum Currency {
  Thb = 'THB',
  Usd = 'USD',
}
