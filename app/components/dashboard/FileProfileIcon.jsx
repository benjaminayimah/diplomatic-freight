
import React from 'react'

function FileProfileIcon({
  icon,
  styles = "rounded-xl",
  color = "#565656"
}) {
  const Icon = icon
  
  return (
    <div style={{ backgroundColor: color }} className={`${styles} h-11 w-11 shrink-0 text-white grid place-items-center`}>
      <Icon strokeWidth={2} className="h-5" />
    </div>
  )
}

export default FileProfileIcon