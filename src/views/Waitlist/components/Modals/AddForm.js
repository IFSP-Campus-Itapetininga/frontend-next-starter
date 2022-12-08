import {Form, Button} from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import api from 'services';
import React from 'react';
import { getCookie } from 'cookies-next'

import style from './Form.module.scss'

const AddForm = () => {

    const{ register, handleSubmit } = useForm();

    const token = getCookie('auth.token')

    const createWaitlist = async data => {
        const dataList = {
          id: data.id,
          nome: data.nome,
          alfabetizado: data.alfabetizado,
          escolaridade: data.escolaridade,
          oficina: data.oficina,
          dataCadastro: data.dataCadastro,
          dataNascimento: data.dataNascimento,
          nomeResponsavel: data.nomeResponsavel,
          telefone: data.telefone
        }
        const request = await api.post('/waitlist', dataList, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        })
    }
    
    return(
              <Form onSubmit={handleSubmit(createWaitlist)}>
                <Form.Group>
                  <Form.Control className={style.form_control}
                    input="true"
                    type="text"
                    placeholder="Nome *"
                    required
                    {...register("nome")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Select className={style.form_control} {...register("alfabetizado")}>
                    <option>Alfabetizado *</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Select className={style.form_control} {...register("escolaridade")}>
                    <option>Escolaridade *</option>
                    <option value="Sem Escolaridade">Sem Escolaridade</option>
                    <option value="Ensino Fundamental I Incompleto">Ensino Fundamental I Incompleto</option>
                    <option value="Ensino Fundamental I Completo">Ensino Fundamental I Completo</option>
                    <option value="Ensino Fundamental II Incompleto">Ensino Fundamental II Incompleto</option>
                    <option value="Ensino Fundamental II Completo">Ensino Fundamental II Completo</option>
                    <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
                    <option value="Ensino Médio Completo">Ensino Médio Completo</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Control className={style.form_control}
                    input="true"
                    type="text"
                    placeholder="Oficina *"
                    required
                    {...register("oficina")}
                  />
                </Form.Group>
                Data de Nascimento *
                <Form.Group>
                  <Form.Control className={style.form_control}
                    input="true"
                    type="date"
                    required
                    {...register("dataNascimento")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control className={style.form_control}
                    input="true"
                    type="text"
                    placeholder="Nome do Responsável *"
                    required
                    {...register("nomeResponsavel")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control className={style.form_control}
                    input="true"
                    type="tel"
                    maxLength="15"
                    placeholder="Telefone *"
                    required
                    {...register("telefone")}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control className={style.form_control}
                    input="true"
                    type="text"
                    value={new Date().toLocaleDateString()}
                    readOnly
                  />
                </Form.Group>
                <div className={style.btn_cad}>
                  <Button className="btn btn-success" type="submit">
                    Cadastrar
                  </Button>
                </div>
              </Form>
    )
}

export default AddForm;