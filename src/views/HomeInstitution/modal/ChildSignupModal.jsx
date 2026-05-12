import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  Grid,
  Select,
  Option,
  ModalOverflow,
} from "@mui/joy";
import { useState } from "react";
import { maskCPF, onlyNumbers } from "../../../utils/masks";
import api from "../../../services/api";

export function ChildSignupModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    full_name: "",
    email: "",
    password: "",
    cpf: "",
    nickname: "",
    birth_date: "",
    gender: "",
  });

  const updateState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCPFChange = (e) => {
    const rawValue = onlyNumbers(e.target.value).slice(0, 11);
    updateState("cpf", rawValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/child/signup", state);
      alert("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error.response.data);
      const msg = error.response?.data?.message || "Erro ao criar conta.";
      alert(msg);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalOverflow>
        <ModalDialog
          minWidth={400}
          maxWidth={600}
          sx={{ borderRadius: "md", p: 3, my: 4 }}
        >
          <ModalClose />
          <Typography level="h3" component="h2">
            Cadastrar Criança ou Adolescente
          </Typography>
          <Divider sx={{ my: 2 }} />

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <FormControl required>
                <FormLabel>Nome Completo</FormLabel>
                <Input
                  placeholder="Digite o nome completo..."
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

              <FormControl required>
                <FormLabel>CPF</FormLabel>
                <Input
                  placeholder="000.000.000-00"
                  value={maskCPF(state.cpf)}
                  onChange={handleCPFChange}
                  slotProps={{ input: { maxLength: 14 } }}
                />
              </FormControl>

              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <FormControl required>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <Input
                      type="date"
                      value={state.birth_date}
                      onChange={(e) =>
                        updateState("birth_date", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl required>
                    <FormLabel>Gênero</FormLabel>
                    <Select
                      placeholder="Selecione..."
                      value={state.gender}
                      onChange={(_, newValue) =>
                        updateState("gender", newValue)
                      }
                    >
                      <Option value="MALE">Masculino</Option>
                      <Option value="FEMALE">Feminino</Option>
                      <Option value="OTHER">Outros</Option>
                    </Select>
                  </FormControl>
                </Grid>
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
            </Stack>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
