import './Filter.scss'
import { useContext } from 'react'
import { AppContext } from '../../../App'
import FilterItem from './FilterItem/FilterItem'

const Filter = () => {
  const {importance, date, type, isFilterHidden} = useContext(AppContext)
  return (
    <div className={isFilterHidden ? 'filter-dropdown hide' : 'filter-dropdown'}>
      <label>Importance</label>
      <FilterItem label="High" defaultChecked={importance.high} criteria="importance" />
      <FilterItem label="Medium" defaultChecked={importance.medium} criteria="importance"/>
      <FilterItem label="Low" defaultChecked={importance.low} criteria="importance" />
      <label>Date</label>
      <FilterItem label="Most Recent" defaultChecked={date.mostRecent} criteria="date" />
      <FilterItem label="Oldest" defaultChecked={date.oldest} criteria="date"/>
      <label>Type</label>
      <FilterItem label="Personal" defaultChecked={type.personal} criteria="type" />
      <FilterItem label="Work" defaultChecked={type.work} criteria="type" />
    </div>
  )
}

export default Filter