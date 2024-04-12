import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }
  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTrasactionList = transactionsList.filter(
      eachtrasaction => id !== eachtrasaction.id,
    )
    this.setState({transactionsList: updatedTrasactionList})
  }

  onAddTrasaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachtrasaction => eachtrasaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({
      optionId: event.target.value,
    })
  }
  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }
  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }
  getExpences = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachtrasaction => {
      if (eachtrasaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachtrasaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachtrasaction => {
      if (eachtrasaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachtrasaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionsList.forEach(eachtrasaction => {
      if (eachtrasaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachtrasaction.amount
      } else {
        expensesAmount += eachtrasaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.state
    const incomeAmount = this.state
    const expensesAmount = this.state
    return (
      <div className="app-container">
        <div className="respon-container">
          <div>
            <h1 className="heading">Hi, Richard</h1>
            <p>
              Welcome back to you<span className="apam">Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="trasaction-detail">
            <form onSubmit={this.onAddTrasaction}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                placeholder="TITLE"
              />

              <label htmlFor="amount">AMOUNT</label>
              <input
                type="text"
                id="amount"
                className="input"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                placeholder="AMOUNT"
              />

              <label htmlFor="select">TYPE</label>
              <select
                id="select"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachoption => (
                  <option key={eachoption.optionId} value={eachoption.optionId}>
                    {eachoption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>

            <div>
              <h1>History</h1>
              <div>
                <ul>
                  <li>
                    <p>Title</p>
                    <p>Amount</p>
                    <p>Type</p>
                  </li>
                  {transactionsList.map(eachtrasaction => (
                    <TransactionItem
                      key={eachtrasaction.id}
                      transactionDetails={eachtrasaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
