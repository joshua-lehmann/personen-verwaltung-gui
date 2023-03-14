import "./Header.css";
export default function Header() {
  return (
    <>
      <div id="header" className={"headerContainer"}>
        <h1>Personen Verwaltung</h1>
        <nav>
          <ul>
            <li>
              <a href={`/city`}>City</a>
            </li>
            <li>
              <a href={`/address`}>Address</a>
            </li>
            <li>
              <a href={`/person`}>Person</a>
            </li>
            <li>
              <a href={`/person-list`}>Person List</a>
            </li>
            <li>
              <a href={`/city-list`}>City List</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}
