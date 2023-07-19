import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles"
import { useState } from "react"
import { useAuth } from "../../hooks/auth"
import { api } from "../../services/api"
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { useNavigate } from "react-router-dom"

export function Header(){
  const { signOut, user } = useAuth()
  const navigation = useNavigate()

  function handleSignOut(){
    navigation("/")
    signOut()
  }

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const [name, setName] = useState(user.name)


  return (
    <Container>
      <Profile to="/profile">
        <img 
          src={avatarUrl}
          alt="Foto do usuário"
        />

        <div>
          <span>Bem vindo</span>
          <strong>{name}</strong>
        </div>
      </Profile>
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}