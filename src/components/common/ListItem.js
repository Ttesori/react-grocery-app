export default function ListItem({ children, ref }) {
  return (
    <li ref={ref}>
      {children}
    </li>
  )
}
