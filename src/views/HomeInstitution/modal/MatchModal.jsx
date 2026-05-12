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
import { Heart, Search, User } from "lucide-react";
import api from "../../../services/api";
import { maskCPF } from "../../../utils/masks";

export function MatchModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const [children, setChildren] = useState([]);
  const [adopters, setAdopters] = useState([]);

  const [state, setState] = useState({
    adopter: null,
    child: null,
  });

  const updateState = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      setDataLoading(true);
      try {
        const response = await api.get(
          "/institution/get-adopters-childs-not-linked",
        );

        setChildren(response.data.data.childs || []);
        setAdopters(response.data.data.adopters || []);
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

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!state.child || !state.adopter) {
      alert("Selecione ambos para realizar o vínculo.");
      return;
    }

    setLoading(true);
    try {
      await api.patch("/institution/link-adopter-child", {
        childId: state.child.id,
        adopterId: state.adopter.id,
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

        <form onSubmit={handleMatch}>
          <Stack spacing={3}>
            <FormControl required>
              <FormLabel>Criança ou Adolescente</FormLabel>
              <Autocomplete
                placeholder="Busque por nome ou CPF..."
                options={children}
                loading={dataLoading}
                value={state.child}
                onChange={(_, newValue) => updateState("child", newValue)}
                getOptionLabel={(option) =>
                  `${option.full_name} (${maskCPF(option.cpf)})`
                }
                renderOption={(props, option) => (
                  <AutocompleteOption {...props} key={option.cpf}>
                    <ListItemDecorator>
                      <User size={18} />
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

            <FormControl required>
              <FormLabel>Adotante</FormLabel>
              <Autocomplete
                placeholder="Busque por nome ou CPF..."
                options={adopters}
                loading={dataLoading}
                value={state.adopter}
                onChange={(_, newValue) => updateState("adopter", newValue)}
                getOptionLabel={(option) =>
                  `${option.full_name} (${maskCPF(option.cpf)})`
                }
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
