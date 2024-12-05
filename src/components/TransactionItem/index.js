import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {title, amount, id, type} = transactionDetails

  const onClickDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="listItemStl historyItem">
      <div className="itemCont">
        <p className="parTitle">{title}</p>
        <p className="par">{amount}</p>
        <p className="parType">{type}</p>
      </div>
      <div className="deleteCont">
        <button
          className="deleteButton"
          type="button"
          onClick={onClickDeleteTransaction}
        >
          <img
            className="deleteImgIcon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
