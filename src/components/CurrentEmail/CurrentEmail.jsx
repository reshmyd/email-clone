import './CurrentEmail.scss'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { FaShare, FaTrashAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import more from '../../assets/images/More.png'
import bin from '../../assets/images/Bin.png'
import reply from '../../assets/images/Reply.png'


const CurrentEmail = () => {
  const {currentEmail, handleEmailCycling, handleDelete, setIsFilterHidden} = useContext(AppContext)
  
  
  return (
    <div className='current-email' onClick={() => setIsFilterHidden(true)}>
      
      { Object.keys(currentEmail).length ? ( <><div className='current-email__header' data-cy={"current-email-"+ currentEmail.emailId}>
        
                  <div className='header-name'>
                    <i className="far fa-user-circle"></i>
                    <div>
                      <p className="sender-name">{currentEmail.name}</p>
                      <p className='sender-emailid'>{currentEmail.emailId}</p>
                    </div>
                  </div>

                  <div className='header-icons'>
                    <span><img src={more} alt="more" /></span>
                    <span><img src={reply} alt="reply" /></span>
                    <span onClick={() => handleDelete(currentEmail)} data-cy="delete-btn"><img src={bin} alt="bin" /></span>
                    
                  </div>
      
                </div>

                <div className='current-email__body'>
                  <div className="subject">{currentEmail.subject}</div>
                  <div className='content'>{currentEmail.content}</div>
                </div>

                <div className='current-email__footer'> 
                  <span onClick={() => handleEmailCycling('left')} data-cy="left-chevron"><FaChevronLeft /></span>
                  <span onClick={() => handleEmailCycling('right')} data-cy="right-chevron"><FaChevronRight /></span>
                  
                </div></>) :  <div className='no-currentMail'>Select an item to read<br />Nothing is selected</div>}

    </div>
  )
}

export default CurrentEmail