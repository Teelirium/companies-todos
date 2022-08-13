import axios from 'axios';
import config from './apiConfig';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import type Company from '../types/Company';

function CompanyForm({ addCompany }: { addCompany: (company: Company) => void }) {
    const form = useRef<HTMLFormElement>(null);
    //@ts-ignore
    const [formData, setFormData] = useState<Company>({});

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        addCompany(formData);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let val;
        switch (event.target.name) {
            case 'INN':
            case 'OGRN':
                val = +event.target.value;
                break;
            default:
                val = event.target.value.trim();
                break;
        }
        setFormData({
            ...formData,
            [event.target.name]: val
        })
    }

    async function findByINN(query: string) {
        const data = await axios.post(config.apiURL, { query }, {
            headers: {
                'Authorization': 'Token ' + config.apiToken
            }
        })
        .then(res => res.data.suggestions)
        .catch(console.log);

        if (!data || data.length === 0) {
            return;
        }
        const companyData = data[0];
        const company: Company = {
            name: companyData.value,
            address: companyData.data.address.value,
            INN: +companyData.data.inn,
            OGRN: +companyData.data.ogrn,
            registrationDate: new Date(companyData.data.state.registration_date)
            .toISOString().split('T')[0]
        }
        console.log(company);
        for (let [key, val] of Object.entries(company)) {
            if (!form.current) continue;
            form.current[key].value = val;
        }
        setFormData(company);
    }

    return <Form onSubmit={handleSubmit} ref={form}>
        <Form.Group>
            <Form.Label>Название
                <input className='ms-2' type={'text'} name='name'
                    onChange={handleChange} required />
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Адрес
                <input className='ms-2' type={'text'} name='address'
                    onChange={handleChange} required />
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>ОГРН
                <input className='ms-2' type={'text'} name='OGRN'
                    onChange={handleChange} pattern='[0-9]+'
                    required
                    maxLength={13} minLength={13}
                />
            </Form.Label>
        </Form.Group>
        <Form.Group className='d-flex align-items-baseline'>
            <Form.Label>ИНН
                <input className='ms-2' type={'text'} name='INN'
                    onChange={handleChange} pattern='[0-9]+'
                    required
                    maxLength={10} minLength={10}
                />
            </Form.Label>
            <div
                className="btn btn-sm btn-primary ms-2 col-4"
                onClick={() => findByINN(formData.INN + '' || '')}
            >
                Загрузить
            </div>
        </Form.Group>
        <Form.Group>
            <Form.Label>Дата регистрации
                <input className='ms-2' type={'date'} name='registrationDate'
                    onChange={handleChange} required max="today"
                />
            </Form.Label>
        </Form.Group>
        <input className='btn btn-primary' type={'submit'} value='Добавить' />
    </Form>
}

export default CompanyForm