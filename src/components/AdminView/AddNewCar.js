import React from "react";
import Table from 'react-bootstrap/Table';
import {FcApprove} from 'react-icons/fc';
import {FcDisapprove} from 'react-icons/fc';


const AddNewCar = () => {
    return (
        <div>
            <Table className="my-table" striped bordered hover>
      <thead>
        <tr>
          <th className="table-header">S/n</th>
          <th className="table-header">Owner Name</th>
          <th className="table-header">Car Name</th>
          <th className="table-header">Car-Type</th>
          <th className="table-header">Action</th>
        </tr>
      </thead>
    </Table>
        </div>
    );
};

export default AddNewCar;