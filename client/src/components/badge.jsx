import React from 'react'

function Badge(props) {
  return (
    <div className={`inline-block rounded-full py-1 px-3 text-[11px] capitalize ${props.status === 'pending' && 'bg-primary text-white'} ${props.status === 'confirm' && 'bg-green-500 text-white'} ${props.status === 'delivered' && 'bg-green-700 text-white'}`}>{props.status}</div>
  )
}

export default Badge