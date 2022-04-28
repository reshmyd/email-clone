import './FilterItem.scss'
import { useContext } from 'react'
import { AppContext } from '../../../../App'

const FilterItem = ({label, defaultChecked, criteria}) => {
  
  const {handleCheckboxClick} = useContext(AppContext)
  
  return (
    <div className="filter-item">
    <input type="checkbox" value={label} id={label} checked={defaultChecked} onClick={e => handleCheckboxClick(e, criteria)} readOnly />
    <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default FilterItem