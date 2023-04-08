export default function Footer() {
  return (
    <div className="container" style={{ fontSize: "0.7rem" }}>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mx-auto">
            Proyecto creado por Assetcom 2023
          </span>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img
              alt="Licencia de Creative Commons"
              src="https://i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
          <span className="mx-auto">Esta obra está bajo una</span>

          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            licencia de Creative Commons Reconocimiento 4.0 Internacional
          </a>
        </div>

        <ul className="nav col-md-1 justify-content-end list-unstyled d-flex">
          <li className="ms-1">
            <a className="text-muted" target="_blank" href="https://github.com/javiertg222/assetcom.git" rel="noreferrer">
              <i className="bi bi-github" style={{ fontSize: "1.9rem" }} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
