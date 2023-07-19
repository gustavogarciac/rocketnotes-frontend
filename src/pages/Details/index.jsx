import { Container, Links, Content } from "./styles"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"
import { Header } from '../../components/Header'
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tags"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function Details(){
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const params = useParams()

  function handleReturnButton(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Você tem certeza que deseja remover a nota?")
    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemove}/>

            <h1>
              {data.title}
            </h1>

            <p>
              {data.descriptions}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a 
                          href={link.url}
                          target="_blank"
                        >
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>

              </Section>
            }
            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag 
                      key={String(tag.id)}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }

            <Button title="Voltar" onClick={handleReturnButton}/>
          </Content>
        </main>
      }
    </Container>
  )
}