import { Container, Form, Avatar } from "./style"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"

export function Profile(){

  return (
    <Container>
      <header>
        <a href="/">
          <FiArrowLeft/>
        </a>
      </header>

      <Form>
        <Avatar>
          <img 
            src="https://github.com/gustavogarciac.png" 
            alt="Foto do usuário"
          />

          <label htmlFor="avatar">
            <FiCamera/>

            <input
              id="avatar"
              type="file"
            />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="Text"
          icon={FiUser}
        />
        <Input
          placeholder="E-mail"
          type="Text"
          icon={FiMail}
        />
        <Input
          placeholder="Senha Atual"
          type="password"
          icon={FiLock}
        />
        <Input
          placeholder="Nova Senha"
          type="password"
          icon={FiLock}
        />

        <Button title="Salvar"/>
      </Form>
    </Container>
  )
}