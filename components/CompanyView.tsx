import type Company from "../types/Company"

function CompanyView({company}: {company: Company}) {
    return (
        <li className="card border col-4 p-3 m-2">
            <div>
                Название: {company.name}
            </div>
            <div>
                Адрес: {company.address}
            </div>
            <div>
                ОГРН: {company.OGRN.toString()}
            </div>
            <div>
                ИНН: {company.INN.toString()}
            </div>
            <div>
                Дата регистрации: {new Date(company.registrationDate).toLocaleDateString()}
            </div>
        </li>
    )
}

export default CompanyView