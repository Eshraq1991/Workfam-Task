import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import { Scheduler, Resource } from "devextreme-react/scheduler";

// import { services, data } from "./data";
import DataCell from "./DataCell";
import ResourceCell from "./ResourceCell";

const currentDate = new Date(2019, 4, 1);
const groups = ["serviceId"];

const views = [
  {
    name: "2 Days",
    type: "day",
    intervalCount: 2,
    startDate: new Date(2019, 3, 30),
    ShowAllDayArea: false
  },
  {
    name: "3 Days",
    type: "day",
    intervalCount: 3,
    startDate: new Date(2019, 3, 30)
  },
  {
    name: "1 Work Week",
    type: "workWeek",
    intervalCount: 1,
    startDate: new Date(2019, 3, 30)
  },
  { name: "1 Months", type: "month", intervalCount: 1 }
];
function Schedule(props) {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(
    () => {
      firebase.getSchedule().then((data) => {
        setAppointments(data);
      });
      firebase.getServices().then((data) => {
        setServices(data);
      });
    },
    [],
    []
  );

  return (
    <Scheduler
      dataSource={appointments}
      views={views}
      defaultCurrentView="day"
      defaultCurrentDate={currentDate}
      startDayHour={8}
      height={700}
      dataCellComponent={DataCell}
      resourceCellComponent={ResourceCell}
      groups={groups}
      showAllDayPanel={
        window.localStorage.getItem("type") === "2" ? true : false
      }
      endDayHour={18}
    >
      <Resource
        label="Service"
        fieldExpr="serviceId"
        dataSource={services}
        allowMultiple={false}
      ></Resource>
    </Scheduler>
  );
}

export default withRouter(Schedule);
