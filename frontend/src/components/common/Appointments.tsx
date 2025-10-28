import { useState } from "react";
import Header from "../client/tickets/Header";
import TicketsTable from "./TicketsTable";

interface AptProps {
  client?: boolean;
}

const Appointments: React.FC<AptProps> = ({ client = false }) => {
  const [filterBy, setFilterBy] = useState("");
  return (
    <div>
      <Header state={filterBy} set={setFilterBy} client={client} />
      <TicketsTable filter={filterBy} client={client} />
    </div>
  );
};

export default Appointments;
