import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Typography,
  Grid,
  Select,
  Option,
} from "@mui/joy";
import { maskCPF, maskPhone, onlyNumbers } from "../../utils/masks";

export default function AdopterSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    full_name: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    address: "",
    birth_date: "",
    gender: "",
    occupation: "",
  });

  const updateState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    const rawValue = onlyNumbers(e.target.value).slice(0, 11);
    updateState("phone", rawValue);
  };

  const handleCPFChange = (e) => {
    const rawValue = onlyNumbers(e.target.value).slice(0, 11);
    updateState("cpf", rawValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/adopter/signup", state);
      alert("Conta criada com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error.response.data);
      const msg = error.response?.data?.message || "Erro ao criar conta.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="signup">
        <Typography level="h2" className="title">
          Cadastro do adotante
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl required>
              <FormLabel>Nome Completo</FormLabel>
              <Input
                placeholder="Digite seu nome..."
                value={state.full_name}
                onChange={(e) => updateState("full_name", e.target.value)}
              />
            </FormControl>

            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="exemplo@email.com"
                    value={state.email}
                    onChange={(e) => updateState("email", e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={state.password}
                    onChange={(e) => updateState("password", e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    placeholder="000.000.000-00"
                    value={maskCPF(state.cpf)}
                    onChange={handleCPFChange}
                    slotProps={{ input: { maxLength: 14 } }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={maskPhone(state.phone)}
                    onChange={handlePhoneChange}
                    slotProps={{ input: { maxLength: 15 } }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControl required>
              <FormLabel>Endereço Completo</FormLabel>
              <Input
                placeholder="Rua, número, bairro..."
                value={state.address}
                onChange={(e) => updateState("address", e.target.value)}
              />
            </FormControl>

            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    value={state.birth_date}
                    onChange={(e) => updateState("birth_date", e.target.value)}
                    slotProps={{ input: { sx: { minHeight: "38px" } } }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Gênero</FormLabel>
                  <Select
                    placeholder="Selecione..."
                    value={state.gender}
                    onChange={(_, newValue) => updateState("gender", newValue)}
                  >
                    <Option value="MALE">Masculino</Option>
                    <Option value="FEMALE">Feminino</Option>
                    <Option value="OTHER">Outros</Option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <FormControl required>
              <FormLabel>Profissão</FormLabel>
              <Input
                placeholder="Ex: Advogado"
                value={state.occupation}
                onChange={(e) => updateState("occupation", e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="btn-submit"
              sx={{ mt: 1 }}
            >
              Criar conta
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}
