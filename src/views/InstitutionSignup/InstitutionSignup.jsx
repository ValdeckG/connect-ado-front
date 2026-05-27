import { useState } from "react";
import "./style.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Typography,
  Grid,
  Divider,
} from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { maskCNPJ, maskPhone, onlyNumbers } from "../../utils/masks";

export default function InstitutionSignup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cnpj: "",
    phone: "",
    full_address: "",
    legal_representative_name: "",
    foundation_date: "",
    license_number: "",
    website_url: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCNPJChange = (e) => {
    const rawValue = onlyNumbers(e.target.value).slice(0, 14);
    updateState("cnpj", rawValue);
  };

  const handlePhoneChange = (e) => {
    const rawValue = onlyNumbers(e.target.value).slice(0, 11);
    updateState("phone", rawValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/institution/signup", state);
      alert("Instituição cadastrada com sucesso!");
      navigate("/institution");
    } catch (error) {
      console.log("Erro ao cadastrar:", error.response.data);
      alert(error.response?.data?.message || "Erro ao realizar cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="signup">
        <Typography level="h2" className="title">
          Cadastro da Instituição
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12}>
                <FormControl required>
                  <FormLabel>Nome da instituição</FormLabel>
                  <Input
                    placeholder="Ex: Instituição Nosso Lar"
                    value={state.name}
                    onChange={(e) => updateState("name", e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
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

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>CNPJ</FormLabel>
                  <Input
                    placeholder="00.000.000/0000-00"
                    value={maskCNPJ(state.cnpj)}
                    onChange={handleCNPJChange}
                    slotProps={{ input: { maxLength: 18 } }}
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

            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Endereço Completo</FormLabel>
                <Input
                  placeholder="Rua, número, bairro..."
                  value={state.full_address}
                  onChange={(e) => updateState("full_address", e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl required>
                <FormLabel>Nome do Representante</FormLabel>
                <Input
                  placeholder="Nome completo"
                  value={state.legal_representative_name}
                  onChange={(e) =>
                    updateState("legal_representative_name", e.target.value)
                  }
                />
              </FormControl>
            </Grid>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Data de Fundação</FormLabel>
                  <Input
                    type="date"
                    value={state.foundation_date}
                    onChange={(e) =>
                      updateState("foundation_date", e.target.value)
                    }
                    slotProps={{ input: { sx: { minHeight: "38px" } } }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required>
                  <FormLabel>Nº da Licença</FormLabel>
                  <Input
                    placeholder="000/ABC"
                    value={state.license_number}
                    onChange={(e) =>
                      updateState("license_number", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel>Site</FormLabel>
                <Input
                  placeholder="https://www.instituicao.com.br"
                  value={state.website_url}
                  onChange={(e) => updateState("website_url", e.target.value)}
                />
              </FormControl>
            </Grid>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="btn-submit"
              sx={{ mt: 1 }}
            >
              Criar conta
            </Button>

            <Divider sx={{ my: 1 }}>Já possui conta?</Divider>
            <Typography level="body-sm" sx={{ textAlign: "center" }}>
              <Link to="/login" className="link-highlight">
                Entrar
              </Link>
            </Typography>
          </Stack>
        </form>
      </div>
    </div>
  );
}
