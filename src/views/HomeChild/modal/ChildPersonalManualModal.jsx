import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
  Grid,
  Textarea,
  ModalOverflow,
} from "@mui/joy";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export function ChildPersonalManualModal({ open, setOpen, childId }) {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    daily_routine: "",
    favorite_food: "",
    favorite_music: "",
    favorite_activity: "",
    hobbies: "",
    study_habits: "",
    fears: "",
    notes: "",
  });

  const updateState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`/child/personal-manual/${childId}`);

        setState((prev) => ({ ...prev, ...response.data.data }));
      } catch (error) {
        console.error(error);
      }
    };

    if (open) {
      loadData();
    }
  }, [open, childId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/child/personal-manual/${childId}`, {
        ...state,
        child_id: childId,
      });
      alert("Manual pessoal cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro do manual:", error.response?.data);
      const msg =
        error.response?.data?.message || "Erro ao salvar informações.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalOverflow>
        <ModalDialog
          minWidth={400}
          maxWidth={700}
          sx={{ borderRadius: "md", p: 3, my: 4 }}
        >
          <ModalClose />
          <Typography level="h3" component="h2">
            Manual de Rotina e Preferências
          </Typography>
          <Typography level="body-sm">
            Preencha as informações que ajudarão na adaptação e no dia a dia.
          </Typography>
          <Divider sx={{ my: 2 }} />

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Rotina Diária</FormLabel>
                <Textarea
                  minRows={2}
                  placeholder="Descreva os horários e atividades principais..."
                  value={state.daily_routine || ""}
                  onChange={(e) => updateState("daily_routine", e.target.value)}
                />
              </FormControl>

              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Comida Favorita</FormLabel>
                    <Textarea
                      minRows={2}
                      placeholder="Ex: Arroz, feijão e batata frita"
                      value={state.favorite_food || ""}
                      onChange={(e) =>
                        updateState("favorite_food", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Música Favorita</FormLabel>
                    <Textarea
                      minRows={2}
                      placeholder="Gênero ou música específica"
                      value={state.favorite_music || ""}
                      onChange={(e) =>
                        updateState("favorite_music", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Atividade Favorita</FormLabel>
                    <Textarea
                      minRows={2}
                      placeholder="Ex: Desenhar, jogar bola"
                      value={state.favorite_activity || ""}
                      onChange={(e) =>
                        updateState("favorite_activity", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Hobbies</FormLabel>
                    <Textarea
                      minRows={2}
                      placeholder="O que gosta de fazer no tempo livre"
                      value={state.hobbies || ""}
                      onChange={(e) => updateState("hobbies", e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Hábitos de Estudo</FormLabel>
                    <Textarea
                      minRows={2}
                      placeholder="Como prefere estudar?"
                      value={state.study_habits || ""}
                      onChange={(e) =>
                        updateState("study_habits", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Medos</FormLabel>
                    <Textarea
                      minRows={2}
                      placeholder="Ex: Escuro, trovoadas"
                      value={state.fears || ""}
                      onChange={(e) => updateState("fears", e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl>
                <FormLabel>Observações Adicionais</FormLabel>
                <Textarea
                  minRows={3}
                  placeholder="Alguma informação importante que não foi mencionada?"
                  value={state.notes || ""}
                  onChange={(e) => updateState("notes", e.target.value)}
                />
              </FormControl>

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="btn-submit"
                sx={{ mt: 2 }}
              >
                Salvar Diário
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
