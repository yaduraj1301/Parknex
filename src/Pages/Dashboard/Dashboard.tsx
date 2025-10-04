export function Dashboard({ setFormData }: any) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newData = {
        name: formData.get('name'),
        age: formData.get('age'),
        address: formData.get('address')
    }

    
    setFormData(newData);
  };

  return (
    <div>
      <h2>Child Component</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" />
        <br />
        <label htmlFor="Age">Age</label>
        <input name="age" type="number" />
        <br />
        <label htmlFor="Address">Address</label>
        <input name="address" type="text" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
