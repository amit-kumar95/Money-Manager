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
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  onChangeTitle = e => {
    this.setState({titleInput: e.target.value})
  }

  onChangeAmount = e => {
    this.setState({amountInput: e.target.value})
  }

  onChangeTransaction = e => {
    this.setState({optionId: e.target.value})
  }

  onAddMoney = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionList: updatedTransactionList,
    })
  }

  getBalanceAmount = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getIncomeAmount = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })

    return incomeAmount
  }

  getExpensesAmount = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()

    return (
      <div className="bg_Container">
        <div className="moneyMangerContainer">
          <h1 className="richardHeading">Hi, Richard</h1>
          <p className="moneyPara">
            Welcome back to your{' '}
            <span className="moneySpan">Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="addMoneyCont">
          <div className="formContainer">
            <form className="transaction-form" onSubmit={this.onAddMoney}>
              <h1 className="transactionHeading">Add Transaction</h1>
              <label className="labelStl" htmlFor="title">
                TITLE
              </label>

              <input
                onChange={this.onChangeTitle}
                type="text"
                id="title"
                className="inputStl"
                value={titleInput}
                placeholder="TITLE"
              />

              <label className="labelStl" htmlFor="amount">
                AMOUNT
              </label>

              <input
                value={amountInput}
                onChange={this.onChangeAmount}
                type="text"
                className="inputStl"
                placeholder="AMOUNT"
              />

              <label className="labelStl" htmlFor="type">
                TYPE
              </label>

              <select
                id="select"
                className="inputStl"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option
                    className="inputStl"
                    key={eachOption.optionId}
                    value={eachOption.optionId}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>

              <button className="addButton" type="submit">
                Add
              </button>
            </form>
          </div>

          <div className="historyContainer">
            <h1>History</h1>

            <ul className="unOrderedHistory">
              <li className="listItemStl">
                <div className="hisItemCont">
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                </div>
              </li>
              {transactionList.map(each => (
                <TransactionItem
                  transactionDetails={each}
                  key={each.id}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
