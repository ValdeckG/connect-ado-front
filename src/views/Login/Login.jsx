import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/joy";
import api from "../../services/api";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const updateState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: state.email,
        password: state.password,
      });

      console.log("Sucesso:", response.data);
      localStorage.setItem("token", response.data.data.access_token);
      navigate("/");
    } catch (error) {
      const mensagemErro =
        error.response?.data?.message || "Erro ao conectar com o servidor";
      alert(mensagemErro);
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="signup">
        <Typography level="h2" className="title">
          Entrar na Conta
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <FormControl required>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={state.email}
                onChange={(e) => updateState("email", e.target.value)}
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                value={state.password}
                onChange={(e) => updateState("password", e.target.value)}
              />
            </FormControl>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="/recuperar-senha" className="forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="btn-submit"
              loading={loading}
              sx={{ mt: 1 }}
            >
              Entrar
            </Button>

            <Divider sx={{ my: 1 }}>ou</Divider>

            <Typography level="body-sm" sx={{ textAlign: "center" }}>
              Ainda não tem uma conta?{" "}
              <Link to="/signup" className="link-highlight">
                Criar conta gratuita
              </Link>
            </Typography>
          </Stack>
        </form>
      </div>
    </div>
  );
}
