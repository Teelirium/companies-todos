import { CloseButton } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import type Company from "../types/Company";

function CompanyView({
  company,
  index,
  updateCompanies,
}: {
  company: Company;
  index: number;
  updateCompanies: (updateFunc: (companiesCopy: Company[]) => Company[]) => void;
}) {
  function updateAddress(value: string) {
    company.address = value;
    updateCompanies((companies) => {
      companies[index] = company;
      return companies;
    })
  }
  function removeCompany() {
    updateCompanies((companies) => {
      companies.splice(index, 1);
      return companies;
    })
  }
  return (
    <li className="card border col-4 p-3 m-2">
      <CardHeader className="d-flex justify-content-between mb-2">
        <span>
          <strong>{company.name}</strong>
        </span>
        <CloseButton onClick={() => removeCompany()}></CloseButton>
      </CardHeader>
      <div>
        Адрес:
        <span
          className="ms-1"
          contentEditable={true}
          onBlur={(ev) => updateAddress(ev.target.textContent || '')}
          suppressContentEditableWarning={true}
        >
          {company.address}
        </span>
      </div>
      <div>ОГРН: {company.OGRN.toString()}</div>
      <div>ИНН: {company.INN.toString()}
      </div>
      <div>
        Дата регистрации:{" "}
        {new Date(company.registrationDate).toLocaleDateString()}
      </div>
    </li>
  );
}

export default CompanyView;
