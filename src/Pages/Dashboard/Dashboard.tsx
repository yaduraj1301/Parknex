import { MainHeader } from "../../Components/main-header/main-header";
import "./dashboard.css";
export function Dashboard({ setFormData }: any) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newData = {
      name: formData.get("name"),
      age: formData.get("age"),
      address: formData.get("address"),
    };

    setFormData(newData);
  };

  return (
    <>
      <MainHeader
        title="Dashboard"
        subtitle="Welcome to ParkNeX Dashboard"
        isDropdownRequired={true}
      />

      <div className="dashboard-content">
        Main contents of dashboard will be displayed here
      </div>
    </>
  );
}
