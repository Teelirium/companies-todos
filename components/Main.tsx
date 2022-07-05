import type Company from '../types/Company'
import Head from 'next/head'
import CompanyView from './CompanyView'
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'
import CompanyForm from './CompanyForm'

let c: Company = {
  name: 'test',
  address: 'hell',
  OGRN: 12,
  INN: 1,
  registrationDate: '12.10.2001'
}

const title = 'Список компаний';

const Main = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [show, setShow] = useState(false);

  function toggleModal() {
    setShow(!show);
  }

  useEffect(() => {
    const existingCompanies = localStorage.getItem('companies');
    if (existingCompanies) {
      setCompanies(JSON.parse(existingCompanies));
    }
  }, []);

  useEffect(() => {
    if (companies.length > 0)
      localStorage.setItem('companies', JSON.stringify(companies));
  })

  useEffect(() => {
    console.log(companies)
  }, [companies]);

  function addCompany(company: Company) {
    setCompanies([...companies, company]);
    toggleModal();
  }

  function updateCompanies(updateFunc:(companiesCopy:Company[])=>Company[]) {
    const newCompanies = updateFunc(companies.slice());
    setCompanies(newCompanies);
    localStorage.setItem('companies', JSON.stringify(newCompanies));
  }

  let i = 0;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='d-flex bg-primary bg-opacity-75 text-white p-2'>
        {title}
      </header>

      <div className='container p-3'>
        <div className='row justify-content-center'>
          <div className='btn btn-primary col-4'
          onClick={toggleModal}>
            Добавить компанию
          </div>
        </div>
        <ul className='row m-4 justify-content-center'>
          {companies.map(c => <CompanyView key={i++} company={c} index={i}
          updateCompanies={updateCompanies}/>)}
        </ul>
      </div>

      <Modal show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <h4>Добавить компанию</h4>
        </Modal.Header>
        <Modal.Body>
          <CompanyForm addCompany={addCompany}/>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Main
