import './EmailList.scss'
import filter from '../../assets/images/Filter.png'
import { useContext } from 'react'
import Email from './Email/Email'
import { AppContext } from '../../App'
import Filter from './Filter/Filter'

const EmailList = () => {
  const {emailList, handleFilterBtnClick} = useContext(AppContext)
  return (
    <div className='email-list'>
      <div className='inbox-filter'>
        <button className='compose-btn' data-cy='compose-btn'>Compose +</button>
        <button onClick={handleFilterBtnClick} className='filter-btn' data-cy='filter-btn'>Filter By<img src={filter} alt="filter"/></button>
      </div>
      <Filter />
      {emailList[0] ? (<div className='mapped-mails'>{emailList.map((elem, i) => <Email email={elem} key={i + 1}/>)}</div>) : <div className='no-mails'>No mails available</div>}

    </div>
  )
}

export default EmailList

{/* <i className="far fa-arrow-right-arrow-left"></i> */}