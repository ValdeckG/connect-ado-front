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
  CircularProgress,
  Box,
} from "@mui/joy";
import { useEffect, useState } from "react";
import api from "../../../services/api";

export function ChildPersonalManualModal({ open, setOpen, adopterId }) {
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

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/child/personal-manual`);
        console.log(response);

        setState((prev) => ({ ...prev, ...response.data.data }));
      } catch (error) {
        console.error("Erro ao buscar o manual do acolhido:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadData();
    }
  }, [open, adopterId]);

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
            Consulte as informações importantes sobre a adaptação e o dia a dia
            do acolhido.
          </Typography>
          <Divider sx={{ my: 2 }} />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
                gap: 2,
              }}
            >
              <CircularProgress size="lg" variant="soft" />
              <Typography level="body-md" color="neutral">
                Carregando informações...
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Rotina Diária</FormLabel>
                <Textarea
                  minRows={2}
                  readOnly
                  variant="soft"
                  value={state.daily_routine || "Não informado"}
                />
              </FormControl>

              <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Comida Favorita</FormLabel>
                    <Textarea
                      minRows={2}
                      readOnly
                      variant="soft"
                      value={state.favorite_food || "Não informado"}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Música Favorita</FormLabel>
                    <Textarea
                      minRows={2}
                      readOnly
                      variant="soft"
                      value={state.favorite_music || "Não informado"}
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
                      readOnly
                      variant="soft"
                      value={state.favorite_activity || "Não informado"}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Hobbies</FormLabel>
                    <Textarea
                      minRows={2}
                      readOnly
                      variant="soft"
                      value={state.hobbies || "Não informado"}
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
                      readOnly
                      variant="soft"
                      value={state.study_habits || "Não informado"}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6}>
                  <FormControl>
                    <FormLabel>Medos</FormLabel>
                    <Textarea
                      minRows={2}
                      readOnly
                      variant="soft"
                      value={state.fears || "Não informado"}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl>
                <FormLabel>Observações Adicionais</FormLabel>
                <Textarea
                  minRows={3}
                  readOnly
                  variant="soft"
                  value={state.notes || "Nenhuma observação cadastrada"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Informações Médicas</FormLabel>
                <Textarea
                  minRows={3}
                  readOnly
                  variant="soft"
                  value={
                    state.child?.health_record ||
                    "Nenhuma informação médica cadastrada"
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Informações Escolares</FormLabel>
                <Textarea
                  minRows={3}
                  readOnly
                  variant="soft"
                  value={
                    state.child?.education_level ||
                    "Nenhuma informação escolar cadastrada"
                  }
                />
              </FormControl>

              <Button
                variant="outlined"
                color="neutral"
                size="lg"
                onClick={() => setOpen(false)}
                sx={{ mt: 2 }}
              >
                Fechar Visualização
              </Button>
            </Stack>
          )}
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
}
