import React from "react";
import "./App.css";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import { Scheduler, Resource } from "devextreme-react/scheduler";

import { services, data } from "./data.js";
import DataCell from "./components/DataCell.js";
import ResourceCell from "./components/ResourceCell.js";

const currentDate = new Date(2019, 4, 1);
const groups = ["serviceId"];

const views = [
  {
    name: "2 Days",
    type: "day",
    intervalCount: 2,
    startDate: new Date(2019, 3, 30)
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

const App = () => (
  <Scheduler
    dataSource={data}
    views={views}
    defaultCurrentView="day"
    defaultCurrentDate={currentDate}
    startDayHour={8}
    height={700}
    dataCellComponent={DataCell}
    resourceCellComponent={ResourceCell}
    groups={groups}
    showAllDayPanel={true}
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
