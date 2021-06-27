export default function ListItem({ children, ref, className }) {
  return (
    <li ref={ref} className={className || ''}>
      {children}
    </li>
  )
}
