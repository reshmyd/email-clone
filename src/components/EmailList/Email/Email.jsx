import './Email.scss'
import { useContext } from 'react'
import { AppContext } from '../../../App'

const Email = ({email}) => {
  const { handleEmailClick } = useContext(AppContext)
  
  return (
    <div className={email.unread ? "email unread" : "email"} onClick={() => handleEmailClick(email)} data-cy={`email-id-${email.id}-${email.importance}-${email.type}`}>
      <i className="far fa-user-circle"></i>
      <div className='email__content'>
        <div className="sender-name"><p>{email.name}</p><p>{email.date}</p></div>
        <div className='email-subject'>{email.subject}</div>
        <div className='email-body'>{email.content}</div>
      </div>
    </div>
  )
}

export default Email