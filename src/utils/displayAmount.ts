import currency from 'currency.js'

const displayAmount = (amount: number) => {
  return currency(amount, {
    symbol: '₽',
    pattern: '# !',
    separator: ' ',
    decimal: ',',
  }).format()
}

export default displayAmount
