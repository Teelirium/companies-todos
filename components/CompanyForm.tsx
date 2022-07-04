import { ChangeEvent, FormEvent, useState } from 'react';
import Form from 'react-bootstrap/Form';
import type Company from '../types/Company';

function CompanyForm({addCompany} : {addCompany: (company:Company)=>void}) {
    const [formData, setFormData] = useState<Company>({});

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        addCompany(formData);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let val;
        switch (event.target.type) {
            case 'number':
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

    return <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Label>Название
                <input className='ms-2' type={'text'} name='name' 
                onChange={handleChange} required />
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Адрес
                <input className='ms-2' type={'text'} name='address' 
                onChange={handleChange} required/>
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>ОГРН
                <input className='ms-2' type={'number'} name='OGRN' 
                onChange={handleChange} required/>
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>ИНН
                <input className='ms-2' type={'number'} name='INN' 
                onChange={handleChange} required/>
            </Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Дата регистрации
                <input className='ms-2' type={'date'} name='registrationDate' 
                onChange={handleChange} required/>
            </Form.Label>
        </Form.Group>
        <input className='btn btn-primary' type={'submit'} value='Добавить'/>
    </Form>
}

export default CompanyForm