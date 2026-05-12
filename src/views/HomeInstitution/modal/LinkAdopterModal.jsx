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
  Autocomplete,
  AutocompleteOption,
  ListItemDecorator,
  ListItemContent,
} from "@mui/joy";
import { useState, useEffect } from "react";
import { Heart, Search } from "lucide-react";
import api from "../../../services/api";
import { maskCPF } from "../../../utils/masks";

export function LinkAdopterModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [adopters, setAdopters] = useState([]);

  const [state, setState] = useState({
    adopter: null,
  });

  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      try {
        const response = await api.get(
          "/institution/get-adopters-not-linked-to-institution",
        );

        setAdopters(response.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setDataLoading(false);
      }
    };

    if (open) {
      loadData();
    }
  }, [open]);

  const handleLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(state);

    try {
      await api.patch("/institution/link-adopter", {
        email: state.adopter.user.email,
      });
      alert("Vínculo realizado com sucesso!");
      setOpen(false);
    } catch (error) {
      const msg = error.response?.data?.message || "Erro ao realizar vínculo.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        minWidth={450}
        maxWidth={500}
        sx={{ borderRadius: "md", p: 3 }}
      >
        <ModalClose />
        <Typography level="h3" startDecorator={<Heart color="#e91e63" />}>
          Vínculo de Harmonização
        </Typography>
        <Typography level="body-sm" sx={{ mb: 2 }}>
          Selecione a criança e o adotante para iniciar o processo.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleLink}>
          <Stack spacing={3}>
            <FormControl required>
              <FormLabel>Adotante</FormLabel>
              <Autocomplete
                placeholder="Busque por nome ou CPF..."
                options={adopters}
                loading={dataLoading}
                value={state.adopter}
                onChange={(_, newValue) => setState({ adopter: newValue })}
                getOptionLabel={(option) =>
                  `${option.full_name} (${maskCPF(option.cpf)})`
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <AutocompleteOption {...props} key={option.cpf}>
                    <ListItemDecorator>
                      <Search size={18} />
                    </ListItemDecorator>
                    <ListItemContent sx={{ fontSize: "sm" }}>
                      {option.full_name}
                      <Typography level="body-xs">
                        CPF: {maskCPF(option.cpf)}
                      </Typography>
                    </ListItemContent>
                  </AutocompleteOption>
                )}
              />
            </FormControl>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="btn-submit"
              sx={{ mt: 1 }}
            >
              Criar Vínculo
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
