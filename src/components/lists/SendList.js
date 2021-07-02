import '../form/css/InputText.css';

export default function SendList({ action, list_id }) {
  return (
    <form className="contact-form mt-8 border-t-2 pt-5" onSubmit={action}>
      <h4 className="mb-2">📬 Send List To Someone (Or Yourself!)</h4>
      <input type="hidden" name="link" value={`${process.env.REACT_APP_BASEURL}/lists/view/${list_id}`} />

      <fieldset className="fieldset pr-2">
        <label className="form-label" htmlFor="to_name">Name</label>
        <input type="text" name="to_name" className="form-control" />
      </fieldset>
      <fieldset className="fieldset">
        <label className="form-label" htmlFor="to_email">Email</label>
        <input type="email" name="to_email" className="form-control" />
      </fieldset>



      <input type="submit" className="btn btn-block" value="Send Email" />
    </form>
  )
}
