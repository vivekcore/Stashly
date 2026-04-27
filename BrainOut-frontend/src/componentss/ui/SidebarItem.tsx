import type { ReactElement } from "react"


interface sidebarProp {
    title: string,
    icons: ReactElement,
    onClick: () => void,
}
const SidebarItem = (props:sidebarProp) => {
  return (
    <div className="flex items-center gap-2 border border-r-0 cursor-pointer transition duration-300 hover:bg-subtle/20 px-4 py-2 rounded-sm mb-4" onClick={props.onClick}>{props.icons} {props.title}</div>
  )
}

export default SidebarItem