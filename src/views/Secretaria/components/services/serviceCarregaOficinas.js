import React, { useState, useEffect } from 'react'

function serviceCarregaOficinas(){
    //Salvar o Projeto
    const [projects, setProjects] = useState([])

     //Carregar Oficinas
     useEffect(() => {

        fetch('https://sexta-e-nois-dbjson.vercel.app/projetos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(

            resp => resp.json()


        ).then(

            data => {

                console.log(data)

                setProjects(data)
            }

        ).catch(

            err => console.log(err)

        )
    }, [])

}

export default serviceCarregaOficinas