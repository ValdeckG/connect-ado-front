import { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/joy";
import {
  Plus,
  Users,
  HeartHandshake,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import "./style.css";
import { ChildSignupModal } from "./modal/ChildSignupModal";
import { MatchModal } from "./modal/MatchModal";

export default function HomeInstitution() {
  const [openChildSignupModal, setOpenChildSignupModal] = useState(false);
  const [openMatchModal, setOpenMatchModal] = useState(false);

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
          <Grid xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-md" startDecorator={<Stethoscope />}>
                  Saúde
                </Typography>
                <Typography level="body-xs">
                  Atualize vacinas, laudos médicos e necessidades.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-md" startDecorator={<BookOpen />}>
                  Educação
                </Typography>
                <Typography level="body-xs">
                  Notas escolares, frequência e histórico pedagógico.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={8}>
            <Card variant="white">
              <Typography level="title-lg" startDecorator={<Users />}>
                Crianças Acolhidas
              </Typography>
              <Typography level="body-sm">
                Gerencie perfis, saúde e educação.
              </Typography>
              <Divider sx={{ my: 1.5 }} />

              <Stack spacing={2}>
                {[
                  {
                    nome: "João Silva",
                    idade: "8 anos",
                    status: "Em Harmonização",
                    cor: "warning",
                  },
                  {
                    nome: "Ana Souza",
                    idade: "5 anos",
                    status: "Aguardando Match",
                    cor: "neutral",
                  },
                ].map((item, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div>
                      <Typography level="title-sm">{item.nome}</Typography>
                      <Typography level="body-xs">{item.idade}</Typography>
                    </div>
                    <Chip variant="soft" color={item.cor} size="sm">
                      {item.status}
                    </Chip>
                    <Button variant="ghost" size="sm">
                      Editar Perfil
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack spacing={3}>
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
                    Vincular um adotante a sua instituição.
                  </Typography>
                  <Button variant="soft" sx={{ mt: 2 }}>
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
      </div>
    </div>
  );
}
