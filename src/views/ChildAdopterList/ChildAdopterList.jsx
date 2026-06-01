/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Typography,
  Table,
  Sheet,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Button,
  Box,
  Chip,
  Stack,
  Input,
  CircularProgress,
} from "@mui/joy";
import {
  Edit2,
  UserMinus,
  Building2,
  Users,
  Baby,
  Search as SearchIcon,
  Plus,
} from "lucide-react";
import api from "../../services/api";
import { ageCalc } from "../../utils/ageCalc";
import { HealthEducationModal } from "./modal/HealthEducationModal";

export default function ChildAdopterList() {
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [childId, setChildId] = useState("");
  const [openHealthEducationModal, setOpenHealthEducationModal] =
    useState(false);
  const [childModal, setChildModal] = useState({});

  const [children, setChildren] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 5;
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(
    async (isMore = false) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setLoading(true);
      const currentPage = isMore ? page + 1 : 1;
      const endpoint =
        index === 0 ? "/institution/childrens" : "/institution/adopters";

      try {
        const response = await api.get(endpoint, {
          params: {
            limit: LIMIT,
            page: currentPage,
            search: search,
          },
          signal: abortControllerRef.current.signal,
        });

        let newItems = response.data.data || [];

        if (isMore) {
          if (index === 0) setChildren((prev) => [...prev, ...newItems]);
          else setAdopters((prev) => [...prev, ...newItems]);
          setPage(currentPage);
        } else {
          if (index === 0) setChildren(newItems);
          else setAdopters(newItems);
          setPage(1);
        }

        setHasMore(newItems.length === LIMIT);
      } catch (err) {
        if (api.isCancel(err)) return;
        console.error("Erro na requisição:", err);
      } finally {
        setLoading(false);
      }
    },
    [index, search, page],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [search, index]);

  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <header className="home-header">
            <div>
              <Typography level="h2">Gerenciamento de Vínculos</Typography>
              <Typography level="body-lg">
                Administre os perfis de acolhidos e famílias adotantes.
              </Typography>
            </div>
          </header>

          <Stack direction="row" spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Input
              placeholder="Pesquisar por nome..."
              startDecorator={
                loading ? (
                  <CircularProgress size="sm" />
                ) : (
                  <SearchIcon size={20} />
                )
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Stack>

          <Sheet
            variant="outlined"
            sx={{
              borderRadius: "md",
              p: 2,
              bgcolor: "background.surface",
              boxShadow: "sm",
            }}
          >
            <Tabs
              value={index}
              onChange={(e, nv) => setIndex(nv)}
              sx={{ bgcolor: "transparent" }}
            >
              <TabList
                variant="soft"
                color="primary"
                sx={{ p: 0.5, borderRadius: "lg", mb: 2 }}
              >
                <Tab disableIndicator>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Baby size={18} />
                    <Typography>Crianças Acolhidas</Typography>
                  </Stack>
                </Tab>

                <Tab disableIndicator>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Users size={18} />
                    <Typography>Famílias Adotantes</Typography>
                  </Stack>
                </Tab>
              </TabList>

              <TabPanel value={0} sx={{ p: 0 }}>
                <Table
                  borderAxis="bothBetween"
                  hoverRow
                  sx={{ "& tr > *": { verticalAlign: "middle" } }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Nome</th>
                      <th style={{ width: "15%" }}>Idade</th>
                      <th style={{ width: "25%" }}>Status</th>
                      <th style={{ textAlign: "right" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map((child) => (
                      <tr key={child.id}>
                        <td>
                          <Typography level="title-sm">
                            {child.full_name}
                          </Typography>
                        </td>
                        <td>{ageCalc(child.birth_date)}</td>
                        <td>
                          <Chip
                            variant="soft"
                            color={child.adopter_id ? "warning" : "neutral"}
                            size="sm"
                          >
                            {child.adopter_id
                              ? "Em Harmonização"
                              : "Aguardando"}
                          </Chip>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            <Button
                              size="sm"
                              variant="outlined"
                              color="neutral"
                              startDecorator={<Edit2 size={16} />}
                              onClick={() => {
                                setChildId(child.id);
                                setChildModal(child);
                                setOpenHealthEducationModal(true);
                              }}
                            >
                              Laudos
                            </Button>
                            <Button
                              size="sm"
                              variant="soft"
                              color="danger"
                              startDecorator={<UserMinus size={16} />}
                            >
                              Desfazer
                            </Button>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {hasMore && !loading && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <Button
                      variant="plain"
                      startDecorator={<Plus size={18} />}
                      onClick={() => fetchData(true)}
                    >
                      Carregar mais crianças
                    </Button>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={1} sx={{ p: 0 }}>
                <Table
                  borderAxis="bothBetween"
                  hoverRow
                  sx={{ "& tr > *": { verticalAlign: "middle" } }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Responsável</th>
                      <th style={{ width: "25%" }}>Criança Vinculada</th>
                      <th style={{ textAlign: "right" }}>
                        Ações de Desligamento
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adopters.map((adopter) => (
                      <tr key={adopter.id}>
                        <td>
                          <Typography level="title-sm">
                            {adopter.full_name}
                          </Typography>
                        </td>
                        <td>
                          {adopter.childProfile[0] &&
                          adopter.childProfile[0].full_name ? (
                            <Chip
                              variant="outlined"
                              color="primary"
                              size="sm"
                              startDecorator={<Baby size={14} />}
                            >
                              {adopter.childProfile[0].full_name}
                            </Chip>
                          ) : (
                            <Typography level="body-xs" fontStyle="italic">
                              Sem vínculo
                            </Typography>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            <Button
                              size="sm"
                              variant="soft"
                              color="warning"
                              disabled={!adopter.childProfile[0]}
                              startDecorator={<UserMinus size={16} />}
                            >
                              Criança
                            </Button>
                            <Button
                              size="sm"
                              variant="soft"
                              color="danger"
                              startDecorator={<Building2 size={16} />}
                            >
                              Instituição
                            </Button>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {hasMore && !loading && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 3 }}
                  >
                    <Button
                      variant="plain"
                      startDecorator={<Plus size={18} />}
                      onClick={() => fetchData(true)}
                    >
                      Carregar mais adotantes
                    </Button>
                  </Box>
                )}
              </TabPanel>
            </Tabs>
          </Sheet>
        </div>
      </div>
      <HealthEducationModal
        open={openHealthEducationModal}
        setOpen={setOpenHealthEducationModal}
        childId={childId}
        child={childModal}
      />
    </>
  );
}
