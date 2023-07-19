import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Textarea } from "../../components/Textarea"
import { NoteItem } from "../../components/NoteItem"
import { Button } from "../../components/Button"
import { Section } from "../../components/Section"
import { Container, Form } from "./styles"
import { Link } from 'react-router-dom'
import { useState } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function New(){
  const [title, setTitle] = useState("")
  const [descriptions, setDescriptions] = useState("")
  
  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()



  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => links.filter(link => link !== deleted))
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag])
    setNewTag("")
  }

  function handleRemoveTag(deleted){
    setTags(prevState => tags.filter(tag => tag !== deleted))
  }

  async function handleNewNote(){
    if(newTag){
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }
    if(newLink){
      return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.")
    }
    await api.post("/notes", {
      title,
      descriptions,
      tags,
      links
    })

    alert("Nota criada com sucesso.")
    navigate(-1)
  }

  return(
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">Voltar</Link>
          </header>

          <Input
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observações"
            onChange={e => setDescriptions(e.target.value)}
          />
          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote}/>
        </Form>
      </main>
    </Container>
  )
}