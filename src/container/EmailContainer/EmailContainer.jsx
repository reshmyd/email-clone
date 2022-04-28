import './EmailContainer.scss'
import EmailList from '../../components/EmailList/EmailList'
import CurrentEmail from '../../components/CurrentEmail/CurrentEmail'

const EmailContainer = () => {
  
  return (
    <div className='email-container'>
      <EmailList />
      <CurrentEmail/>
    </div>
  )
}

export default EmailContainer