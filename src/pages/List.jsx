// import "./list.scss"
import Navbar from "../components/navbar/Navbar";
import TableUsers from "../components/table/Table";
// import Datatable from "../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list">
      <div className="listContainer">
        <Navbar />
        <TableUsers></TableUsers>
      </div>
    </div>
  );
};

export default List;
