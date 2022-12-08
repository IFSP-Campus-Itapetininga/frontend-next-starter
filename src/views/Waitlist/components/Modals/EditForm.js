// const EditForm = () => {

//     const [pegaID, setPegaID] = useState({});

//     const tokenHeaders = getCookie('auth.token')

//     async function getIdWaitlist(){ 
//       const response = await api.get('/waitlist/id', {
//         headers: {
//           'authorization': `Bearer ${tokenHeaders}`,
//         }
//       });
//       setPegaID(response.data)
//     }

//     useEffect(() => {
//       getIdWaitlist()
//     },[])

//     const editWaitlist = async data => {
//         const editDataList = {
//           nome: data.nome,
//           alfabetizado: data.alfabetizado,
//           escolaridade: data.escolaridade,
//           oficina: data.oficina,
//           dataNascimento: data.dataNascimento,
//           nomeResponsavel: data.nomeResponsavel,
//           telefone: data.telefone
//         }
//         console.log(editDataList)
//         const request = await api.put(`/waitlist/${pegaID}`, editDataList, {
//           headers: {
//             'authorization': `Bearer ${tokenHeaders}`,
//           }
//         })
//     }

//     function recarregaPagina(){
//         window.location.reload(true);
//     }    

//     return(
//       <Form onSubmit={handleSubmit(editWaitlist)}>
//         <Form.Group>
//           <Form.Control className={style.form_control}
//             input="true"
//             type="text"
//             placeholder="Nome *"
//             required
//             {...register("nome")}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Select className={style.form_control} {...register("alfabetizado")}>
//             <option>Alfabetizado *</option>
//             <option value="1">Sim</option>
//             <option value="0">Não</option>
//           </Form.Select>
//         </Form.Group>
//         <Form.Group>
//           <Form.Select className={style.form_control} {...register("escolaridade")}>
//             <option>Escolaridade *</option>
//             <option value="Sem Escolaridade">Sem Escolaridade</option>
//             <option value="Ensino Fundamental I Incompleto">Ensino Fundamental I Incompleto</option>
//             <option value="Ensino Fundamental I Completo">Ensino Fundamental I Completo</option>
//             <option value="Ensino Fundamental II Incompleto">Ensino Fundamental II Incompleto</option>
//             <option value="Ensino Fundamental II Completo">Ensino Fundamental II Completo</option>
//             <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
//             <option value="Ensino Médio Completo">Ensino Médio Completo</option>
//           </Form.Select>
//         </Form.Group>
//         <Form.Group>
//           <Form.Control className={style.form_control}
//             input="true"
//             type="text"
//             placeholder="Oficina *"
//             required
//             {...register("oficina")}
//           />
//         </Form.Group>
//         <Form.Group>
//           Data de Nascimento *
//           <Form.Control className={style.form_control}
//             input="true"
//             type="date"
//             placeholder="Data de Nascimento *"
//             required
//             {...register("dataNascimento")}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Control className={style.form_control}
//             input="true"
//             type="text"
//             placeholder="Nome do Responsável *"
//             required
//             {...register("nomeResponsavel")}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Control className={style.form_control}
//             input="true"
//             type="text"
//             placeholder="Telefone*"
//             required
//             {...register("telefone")}
//           />
//         </Form.Group>
//         <div className={style.btn_cad}>
//           <Button className="btn btn-success" type="submit" onClick={recarregaPagina}>
//             Editar
//           </Button>
//         </div>
//       </Form>
//     )
// }

// export default EditForm;