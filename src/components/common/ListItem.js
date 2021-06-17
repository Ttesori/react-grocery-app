export default function ListItem({ children, ref, key }) {
  return (
    <li ref={ref} key={key}>
      {children}
    </li>
  )
}
