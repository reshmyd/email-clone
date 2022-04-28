import { AppContext } from '../../App'
import { useContext } from 'react'
import './SideNav.scss'

const SideNav = () => {
  const {unread, isInboxActive, handleTabClick, inTrash, setIsFilterHidden} = useContext(AppContext)
  return (
    <div className='side-nav' onClick={() => setIsFilterHidden(true)}>
      <div className={isInboxActive ? "active" : ""} onClick={() => handleTabClick('inbox')} data-cy="inbox-tab"><span><i className="far fa-envelope"></i>Inbox</span><p data-cy="no-unread">{unread}</p></div>
      <div className={isInboxActive ? "" : "active"} onClick={() => handleTabClick('trash')} data-cy="trash-tab"><span><i className="far fa-trash-alt"></i>Trash</span><p data-cy="no-in-trash">{inTrash}</p></div>
    </div>
  )
}

export default SideNav