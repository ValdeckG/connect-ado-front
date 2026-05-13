import { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/joy";
import {
  Plus,
  Users,
  HeartHandshake,
  BookOpen,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ChildSignupModal } from "./modal/ChildSignupModal";
import { MatchModal } from "./modal/MatchModal";
import { LinkAdopterModal } from "./modal/LinkAdopterModal";
import { Box } from "@mui/joy";

export default function HomeInstitution() {
  const navigate = useNavigate();
  const [openChildSignupModal, setOpenChildSignupModal] = useState(false);
  const [openMatchModal, setOpenMatchModal] = useState(false);
  const [openLinkAdopterModal, setOpenLinkAdopterModal] = useState(false);

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <div>
            <Typography level="h2">Painel da Instituição</Typography>
            <Typography level="body-lg">
              Gestão de acolhidos e processos de harmonização.
            </Typography>
          </div>
          <Button
            startDecorator={<Plus />}
            size="lg"
            color="primary"
            onClick={() => setOpenChildSignupModal(true)}
          >
            Cadastrar Criança
          </Button>
        </header>

        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-md" startDecorator={<Stethoscope />}>
                  Saúde
                </Typography>
                <Typography level="body-xs">
                  Atualize vacinas, laudos médicos e necessidades específicas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-md" startDecorator={<BookOpen />}>
                  Educação
                </Typography>
                <Typography level="body-xs">
                  Notas escolares, frequência e histórico pedagógico dos
                  acolhidos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={7}>
            <Card variant="plain" sx={{ height: "100%", boxShadow: "sm" }}>
              <Typography level="title-lg" startDecorator={<Users />}>
                Crianças Acolhidas e Adotantes
              </Typography>
              <Typography level="body-sm">
                Acesse a listagem completa e gerencie os perfis que estão
                vinculados a sua instituição.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  py: 4,
                }}
              >
                <Button
                  variant="soft"
                  color="primary"
                  size="lg"
                  endDecorator={<ArrowRight />}
                  onClick={() => navigate("/child-adopter-list")}
                  sx={{ borderRadius: "md" }}
                >
                  Ver Lista de Crianças e Adotantes
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid xs={12} md={5}>
            <Stack spacing={2}>
              <Card variant="solid" color="primary" invertedColors>
                <CardContent>
                  <Typography
                    level="title-lg"
                    startDecorator={<HeartHandshake />}
                  >
                    Fazer Match
                  </Typography>
                  <Typography level="body-sm">
                    Vincular uma criança a uma família adotante cadastrada.
                  </Typography>
                  <Button
                    variant="soft"
                    sx={{ mt: 2 }}
                    onClick={() => setOpenMatchModal(true)}
                  >
                    Iniciar Processo
                  </Button>
                </CardContent>
              </Card>

              <Card variant="solid" color="primary" invertedColors>
                <CardContent>
                  <Typography
                    level="title-lg"
                    startDecorator={<HeartHandshake />}
                  >
                    Vincular Adotante
                  </Typography>
                  <Typography level="body-sm">
                    Cadastrar e vincular um novo adotante à sua instituição.
                  </Typography>
                  <Button
                    variant="soft"
                    sx={{ mt: 2 }}
                    onClick={() => setOpenLinkAdopterModal(true)}
                  >
                    Iniciar Vínculo
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <ChildSignupModal
          open={openChildSignupModal}
          setOpen={setOpenChildSignupModal}
        />
        <MatchModal open={openMatchModal} setOpen={setOpenMatchModal} />
        <LinkAdopterModal
          open={openLinkAdopterModal}
          setOpen={setOpenLinkAdopterModal}
        />
      </div>
    </div>
  );
}
