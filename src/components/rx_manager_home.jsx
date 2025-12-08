import { Link } from "react-router-dom";
import { modules } from '../utils/modules';
export function RxManagerHome() {
  return (
    <div className="container-fluid w-75">
      <h1 className="text-center m-2">RxManager Home</h1>

      <div className="d-flex flex-wrap ">
        {modules.map(module => (
          <Link to={module.path} key={module.name} className="text-decoration-none text-secondary d-flex  justify-content-evenly gap-2 align-items-center m-4 border w-25 shadow rounded p-3"  >
            <div className="bi bi-person"></div>
            <div className="fw-bold">{module.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
