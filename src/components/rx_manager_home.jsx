// import { Link } from "react-router-dom";
// import { modules } from '../utils/modules';
// export function RxManagerHome() {
//   return (
//     <div className="container-fluid w-75">
//       <h1 className="text-center m-2">RxManager Home</h1>

//       <div className="d-flex flex-wrap ">
//         {modules.map(module => (
//           <Link to={module.path} key={module.name} className="text-decoration-none text-secondary d-flex  justify-content-evenly gap-2 align-items-center m-4 border w-25 shadow rounded p-3"  >
//             <div className="bi bi-person"></div>
//             <div className="fw-bold">{module.name}</div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { modules } from "../utils/modules";

export function RxManagerHome() {
  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold mb-4 text-primary">
        RxManager Dashboard
      </h2>

      <div className="row g-4">
        {modules.map((module) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={module.name}>
            <Link
              to={module.path}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm border-0 module-card">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                  <i className={`bi ${module.icon} fs-1 text-primary mb-3`}></i>
                  <h6 className="fw-semibold text-dark">
                    {module.name}
                  </h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
